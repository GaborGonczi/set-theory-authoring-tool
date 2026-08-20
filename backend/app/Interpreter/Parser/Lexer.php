<?php
namespace App\Interpreter\Parser;

use App\Interpreter\Regexp;
use App\Interpreter\Lib\Builtin;
use App\Interpreter\Parser\Exceptions\LexerException;

/**
* A class that represents a lexer for the set theory language.
* A lexer is a component that converts a sequence of characters into a sequence of tokens.
* A token is a meaningful unit of the language, such as a keyword, an identifier, an operator, etc.
*
* @package App\Interpreter\Parser
*/
class Lexer
{

    /**
    * @var string A string that contains the input to be lexed
    */
    private $input;

    /**
    * The constructor of the lexer class.
    * @param string $input The input to be lexed. Default is an empty string.
    */
    public function __construct($input = "")
    {
        $this->setInput($input);
    }

    /**
    * A method that sets the input to be lexed.
    * @param string $input The input to be lexed.
    */
    public function setInput($input)
    {
        $this->input= $input . "$";
    }

    public function getTokens(){
        try {
            $tokens=$this->tokenize();
        } catch (LexerException $le) {
            return (string) $le;
        }
        return $tokens;
    }


    /**
    * A method that tokenizes the input and returns an array of tokens.
    * @return array An array of tokens.
    * @throws LexerException If an invalid character is encountered.
    */
    private function tokenize()
    {

        $tokens = [];


        $numregexp = new Regexp(Token::NUMBER['value']);
        $idregexp = new Regexp(Token::IDENTIFIER['value']);
        $tobeeqregexp = new Regexp(Token::TOBEEQUAL['value']);
        $lessthanoreqregexp = new Regexp(Token::LESSTHANOREQUAL['value']);
        $greaterthanoreqregexp = new Regexp(Token::GREATERTHANOREQUAL['value']);
        $arrow = new Regexp(Token::ARROW['value']);

        $characters = preg_split('//u', $this->input, -1, PREG_SPLIT_NO_EMPTY);

        if($characters==false) {
            throw new LexerException('Érvénytelen karakterlánc.');
        }
        
        for ($i = 0; $i < count($characters); $i++) {
            
            $c=$characters[$i];
           
            if ($numregexp->test($c)) {
                $num = $c;
                while (isset($characters[$i + 1]) &&$numregexp->test($num . $characters[$i + 1])) {
                    $num .= $characters[++$i];
                }
                $tokens[] = ['type' => Token::NUMBER['name'], 'value' => floatval($num)];
            } else if ($idregexp->test($c)) {
                $id = $c;
                while (isset($characters[$i + 1])&&  $idregexp->test($id . $characters[$i + 1])) {
                    $id .= $characters[++$i];
                }
                if (in_array($id, Builtin::NAMES)) {
                    $tokens[] = ['type' => strtolower($id), 'value' => $id];
                } else {
                    $tokens[] = ['type' => Token::IDENTIFIER["name"], 'value' => $id];
                }
            } else if (isset($characters[$i])&&isset($characters[$i + 1])&&$tobeeqregexp->test($characters[$i] . $characters[$i + 1])) {
                $tokens[] = ['type' => Token::TOBEEQUAL['name'], 'value' => Token::TOBEEQUAL['value']];
                ++$i;
            } else if (isset($characters[$i])&&isset($characters[$i + 1])&&$lessthanoreqregexp->test($characters[$i] . $characters[$i + 1])) {
                $tokens[] = ['type' => Token::LESSTHANOREQUAL['name'], 'value' => Token::LESSTHANOREQUAL['value']];
                ++$i;
            } else if (isset($characters[$i])&&isset($characters[$i + 1])&&$greaterthanoreqregexp->test($characters[$i] . $characters[$i + 1])) {
                $tokens[] = ['type' => Token::GREATERTHANOREQUAL['name'], 'value' => Token::GREATERTHANOREQUAL['value']];
                ++$i;
            } else if (isset($characters[$i])&&isset($characters[$i + 1])&&$arrow->test($characters[$i] . $characters[$i + 1])) {
                $tokens[] = ['type' => Token::ARROW['name'], 'value' => Token::ARROW['value']];
                ++$i;
            }  else if ($c === ' ' || $c === '\t') {
                continue;
            } else {
                switch ($c) {
                    case (TOKEN::PLUS['value']):
                        $tokens[] = ['type' => token::PLUS['name'], 'value' => TOKEN::PLUS['value']];
                        break;
                    case (TOKEN::MINUS['value']):
                        $tokens[] = ['type' => token::MINUS['name'], 'value' => TOKEN::MINUS['value']];
                        break;
                    case (TOKEN::MULTIPLY['value']):
                        $tokens[] = ['type' => token::MULTIPLY['name'], 'value' => TOKEN::MULTIPLY['value']];
                        break;
                    case (TOKEN::DIVIDE['value']):
                        $tokens[] = ['type' => token::DIVIDE['name'], 'value' => TOKEN::DIVIDE['value']];
                        break;
                    case (TOKEN::DOT['value']):
                        $tokens[] = ['type' => token::DOT['name'], 'value' => TOKEN::DOT['value']];
                        break;
                    case (TOKEN::EQUAL['value']):
                        $tokens[] = ['type' => TOKEN::EQUAL['name'], 'value' => TOKEN::EQUAL['value']];
                        break;
                    case (TOKEN::COMMA['value']):
                        $tokens[] = ['type' => TOKEN::COMMA['name'], 'value' => TOKEN::COMMA['value']];
                        break;
                    case (TOKEN::VERTICALLINE['value']):
                        $tokens[] = ['type' => TOKEN::VERTICALLINE['name'], 'value' => TOKEN::VERTICALLINE['value']];
                        break;
                    case (TOKEN::LEFTCURLYBRACE['value']):
                        $tokens[] = ['type' => TOKEN::LEFTCURLYBRACE['name'], 'value' => TOKEN::LEFTCURLYBRACE['value']];
                        break;
                    case (TOKEN::RIGHTCURLYBRACE['value']):
                        $tokens[] = ['type' => TOKEN::RIGHTCURLYBRACE['name'], 'value' => TOKEN::RIGHTCURLYBRACE['value']];
                        break;
                    case (TOKEN::LEFTPARENTHESIS['value']):
                        $tokens[] = ['type' => TOKEN::LEFTPARENTHESIS['name'], 'value' => TOKEN::LEFTPARENTHESIS['value']];
                        break;
                    case (TOKEN::RIGHTPARENTHESIS['value']):
                        $tokens[] = ['type' => TOKEN::RIGHTPARENTHESIS['name'], 'value' => TOKEN::RIGHTPARENTHESIS['value']];
                        break;
                    case (TOKEN::LEFTSQUAREBRACKET['value']):
                        $tokens[] = ['type' => TOKEN::LEFTSQUAREBRACKET['name'], 'value' => TOKEN::LEFTSQUAREBRACKET['value']];
                        break;
                    case (TOKEN::RIGHTSQUAREBRACKET['value']):
                        $tokens[] = ['type' => TOKEN::RIGHTSQUAREBRACKET['name'], 'value' => TOKEN::RIGHTSQUAREBRACKET['value']];
                        break;
                    case (TOKEN::LESSTHAN['value']):
                        $tokens[] = ['type' => TOKEN::LESSTHAN['name'], 'value' => TOKEN::LESSTHAN['value']];
                        break;
                    case (TOKEN::GREATERTHAN['value']):
                        $tokens[] = ['type' => TOKEN::GREATERTHAN['name'], 'value' => TOKEN::GREATERTHAN['value']];
                        break;
                    case (TOKEN::EOL['value']):
                        $tokens[] = ['type' => TOKEN::EOL['name'], 'value' => TOKEN::EOL['value']];
                        break;
                    case (TOKEN::COMPLEMENT['value']):
                        $tokens[] = ['type' => TOKEN::COMPLEMENT['name'], 'value' => TOKEN::COMPLEMENT['value']];
                        break;
                    case (TOKEN::ELEMENTOF['value']):
                        $tokens[] = ['type' => TOKEN::ELEMENTOF['name'], 'value' => TOKEN::ELEMENTOF['value']];
                        break;
                    case (TOKEN::NOTELEMENTOF['value']):
                        $tokens[] = ['type' => TOKEN::NOTELEMENTOF['name'], 'value' => TOKEN::NOTELEMENTOF['value']];
                        break;
                    case (TOKEN::SUBSETOF['value']):
                        $tokens[] = ['type' => TOKEN::SUBSETOF['name'], 'value' => TOKEN::SUBSETOF['value']];
                        break;
                    case (TOKEN::REALSUBSETOF['value']):
                        $tokens[] = ['type' => TOKEN::REALSUBSETOF['name'], 'value' => TOKEN::REALSUBSETOF['value']];
                        break;
                    case (TOKEN::UNION['value']):
                        $tokens[] = ['type' => TOKEN::UNION['name'], 'value' => TOKEN::UNION['value']];
                        break;
                    case (TOKEN::INTERSECTION['value']):
                        $tokens[] = ['type' => TOKEN::INTERSECTION['name'], 'value' => TOKEN::INTERSECTION['value']];
                        break;
                    case (TOKEN::SETMINUS['value']):
                        $tokens[] = ['type' => TOKEN::SETMINUS['name'], 'value' => TOKEN::SETMINUS['value']];
                        break;
                    case (TOKEN::DIVIDES['value']):
                        $tokens[] = ['type' => TOKEN::DIVIDES['name'], 'value' => TOKEN::DIVIDES['value']];
                        break;
                    case (TOKEN::DOESNOTDIVIDE['value']):
                        $tokens[] = ['type' => TOKEN::DOESNOTDIVIDE['name'], 'value' => TOKEN::DOESNOTDIVIDE['value']];
                        break;
                    case (TOKEN::LAND['value']):
                        $tokens[] = ['type' => TOKEN::LAND['name'], 'value' => TOKEN::LAND['value']];
                        break;
                    case (TOKEN::LOR['value']):
                        $tokens[] = ['type' => TOKEN::LOR['name'], 'value' => TOKEN::LOR['value']];
                        break;   
                    default:
                        $lastGood = $tokens[count($tokens) - 1];
                        throw new LexerException($this->getErrorMessage($lastGood,$i));
                }
            }
        }

        return $tokens;
    }

    private function getErrorMessage($lastGood,$i) {
        
        return 'Az utolsó helyes szimbólum: ' . $lastGood['value']. ' Az utolsó helyes szimbólum pozíciója: '. $i+1;   
        
    }
}