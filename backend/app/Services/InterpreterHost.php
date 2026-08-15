<?php

namespace App\Services;

use App\Interpreter\Lib\DataStructures\Map;
use App\Interpreter\Parser\Lexer;
use App\Interpreter\Parser\Parser;
use App\Models\Expression;
use App\Models\File;
use App\Models\Variable;
use App\Interpreter\Lib\DataStructures\Point;
use App\Interpreter\Lib\DataStructures\Set;

class InterpreterHost
{
    private array $variableArray = [];
    public function __construct(
        private Lexer $lexer,
        private Parser $parser,
        private ?File $file,
        private ?Expression $expression,
        private ?Variable $definedVariable,
        private ?Variable $newVariable,
        private Map $variableMap = new Map([])
    ){}

    public function process($user, $params)
    {
        $error = $this->loadModels($user, $params);

        if ($error != null) {
            return $error;
        }

        if (!$params['noparse']) {
            $this->prepareParser();
            $result = $this->evaluate($params['statement']);
        } else {
            $result = $params['statement'];
        }

        $this->down($user, $params, $result);

        $file=$this->file->load(['expressions', 'variables']);

        return [
            'body' => ['file' =>$file],
            'status' => 200
        ];
    }

    private function loadModels($user, $params)
    {
        if (isset($params['file_id'])) {
            $this->file=File::where('id', '=', $params['file_id'])->whereBelongsTo($user)->whereNull('deleted_at')->first();

            if ($this->file== null) {
                return [
                    'body' => ['message' => 'A keresett fájl nem található.'],
                    'status' => 404
                ];
            }

            $this->variableArray = $this->file->variables()->whereNull('deleted_at')->pluck('value', 'name')->toArray();
        }
        else if (isset($params['expression_id'])) {
            $this->expression = Expression::where('id','=',$params['expression_id']) ->whereNull('deleted_at')->first();

            if ($this->expression == null) {
                return [
                    'body' => ['message' => 'A keresett kifejezés nem található.'],
                    'status' => 404
                ];
            }

            $this->file = $this->expression->file()->whereBelongsTo($user)->whereNull('deleted_at')->first();

            if ($this->file == null) {
                return [
                    'body' => ['message' => 'A keresett fájl nem található.'],
                    'status' => 404
                ];
            }

            $this->variableArray = $this->file->variables()->whereNull('deleted_at')->pluck('value', 'name')->toArray();

            $this->definedVariable = $this->expression->variable;
        }
        else {
            $this->file = File::create([
                'user_id' => $user->id,
                'example' => false
            ]);

            $this->variableArray = [];
        }

        return null;
    }

    private function prepareParser()
    {
        $this->variableMap = $this->toVariableMap($this->variableArray);
        $this->parser->setVars($this->variableMap);
    }

    private function evaluate(string $statement): string
    {
        $this->lexer->setInput($statement);
        $tokens = $this->lexer->getTokens();

        if (gettype($tokens) === "string") {
            $result = $tokens;
        } else {
            $this->parser->setTokens($tokens);
            $result = $this->parser->parse();
        }

        return $result;
    }

    private function down($user, $params, $result)
    {
        if ($params['file_id']) {
            $this->expression=Expression::create([
                'file_id'=>$params['file_id'],
                'statement'=>$params['statement'],
                'result'=>$result,
                'start'=>0,
                'end'=>strlen($params['statement']),
                'noparse'=>$params['noparse'],
                'row'=>$this->file->expressions()->count()+1,
            ]);

        }
        else if($params['expression_id']) {
            $this->expression->update([
                'statement'=>$params['statement'],
                'result'=>$result,
                'start'=>0,
                'end'=>strlen($params['statement']),
                'noparse'=>$params['noparse'],
            ]);
        }
        else {
            $this->expression=Expression::create([
                'file_id'=>$this->file->id,
                'statement'=>$params['statement'],
                'result'=>$result,
                'start'=>0,
                'end'=>strlen($params['statement']),
                'noparse'=>$params['noparse'],
                'row'=>$this->file->expressions()->count()+1,
            ]);
        }
        if (!$params['noparse']) {
            $this->saveVariables();
        }


    }

    private function saveVariables()
    {
        $definedVariableName = $this->parser->getDefinedVariable();

        $new = $this->parser->getVars();

        if($definedVariableName !== null) {

            if($this->definedVariable !== null&&$this->definedVariable->name === $definedVariableName) {

                $this->definedVariable->update([
                    'value' => json_encode($new->get($definedVariableName))
                ]);

            }
            else {
                $this->newVariable = $this->file->variables()->where('name','=',$definedVariableName)->whereNull('deleted_at')->first();

                if($this->newVariable === null) {
                    $this->newVariable = Variable::create([
                        'file_id' => $this->file->id,
                        'name' => $definedVariableName,
                        'value' => json_encode($new->get($definedVariableName)),
                    ]);
                }
                else {
                    $this->newVariable->update([
                        'value' => json_encode($new->get($definedVariableName))
                    ]);
                }

                $this->expression->update([
                    'variable_id'=>$this->newVariable->id
                ]);

                if ($this->definedVariable !== null && $this->definedVariable->id !== $this->newVariable->id && !$this->definedVariable->expressions()->exists()) {
                    $this->definedVariable->delete();
                }
            }

        }
        else {
            $this->expression->update([
                'variable_id' => null
            ]);

            if($this->definedVariable !== null && !$this->definedVariable->expressions()->exists()) {
                $this->definedVariable->delete();
            }
        }
    }

    private function toVariableMap(array $variableArray = [])
    {
        $variableMap = new Map([]);

        foreach ($variableArray as $name => $value) {
            $variableMap->add($name,$this->getApropriateObject(json_decode($value, true)));
        }

        return $variableMap;
    }

    private function getApropriateObject(array $array)
    {
        if ($array['name'] === "Set") {
            if (!in_array($array['type'],array('integer', 'double', 'boolean'))) {
                $objects = [];

                foreach ($array['elements'] as $value) {
                    if ($array['type'] === Point::class) {
                        $p = new Point($value['x'], $value['y']);
                        $objects[] = $p;
                    }
                }

                $array['elements'] = $objects;
            }

            return new Set([...$array['elements']]);

        } 
        else if ($array['name'] === "Point") {
            return new Point($array['x'], $array['y']);
        }
    }
}