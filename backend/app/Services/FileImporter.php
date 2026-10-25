<?php

namespace App\Services;

use App\Interpreter\SymbolTable;

class FileImporter
{
 
    public function __construct(
        private InterpreterHost $host
    ){}
    public function import($user, $content) {

        $lines = preg_split('/\R+/', $content, -1, PREG_SPLIT_NO_EMPTY);

        if($lines===false){
            return [
                'body'=>['message'=>'Ismeretlen hiba történt.'],
                'status'=>500
            ]; 
        }

        if(empty($lines)){
            return [
                'body'=>['message'=>'Hibás fájl! A fájlban nem találhatóak sorok.'],
                'status'=>422
            ]; 
        }

        $result=$this->separateLines($lines);
        
        if(isset($result['status'])){
            return $result;
        }

        $response=$this->processLines($user,$result);

        return $response;

    }

    private function separateLines(array $lines) {
        $i=0;
        $rowsToImport=[];
       
        while ($i<count($lines)) {
            if($this->isComment($lines[$i])){
                ++$i;
            }
            else if($this->isExecuteCommand($lines[$i])){
                ++$i;
                if(!isset($lines[$i])){
                    return [
                        'body'=>['message'=>'Hibás fájl! Az @execute vezérlősor nem lehet a fájl végén.'],
                        'status'=>422
                        
                    ];
                }
                else if($this->isResultCommand($lines[$i])){
                    return [
                        'body'=>['message'=>'Hibás fájl! Az @execute vezérlősor után nem lehet vezérlősor.'],
                        'status'=>422
                        
                    ];
                }
                else if($this->isEmpty($lines[$i])){
                    ++$i;
                }
                $rowsToImport[]=['statement'=>$lines[$i],'noparse'=>false];
                ++$i;

            }
            else if($this->isResultCommand($lines[$i])){
                if(!isset($lines[$i-2]) || !$this->isExecuteCommand($lines[$i-2])) {
                    return [
                        'body'=>['message'=>'Hibás fájl! A @result vezérlősor előtt 2 sorral @execute vezérlősornak kell lennie.'],
                        'status'=>422
                        
                    ];
                }
                $i+=2;
            }
            else if($this->isEmpty($lines[$i])){
                ++$i;
            }
            else{
                $rowsToImport[]=['statement'=>$lines[$i],'noparse'=>true];
                ++$i;
            }
        }
        return $rowsToImport;
    }

    private function processLines($user,$lines) {

        $fileId=null;
        $expressionId=null;
        $response=[
            'body'=>[],
            'status'=>204
        ];
        foreach ($lines as $line) {
            if($fileId===null&&isset($response['body']['file']['id'])){
                $fileId=$response['body']['file']['id'];
            }
            $line['file_id']=$fileId;
            $line['expression_id']=$expressionId;
            $line['statement']=SymbolTable::toUnicode($line['statement']);
            $response=$this->host->process($user,$line);
            
        }

        return [
            ...$response,
            'status' => 201
        ];

    }

    private function isComment($line) {
        return str_starts_with($line,'#');
    }

    private function isExecuteCommand($line){
        return "@execute" === trim($line);
    }

    private function isResultCommand($line){
        return "@result" === trim($line);
    }

    private function isEmpty($line){
        return $line === "";
    }
}
