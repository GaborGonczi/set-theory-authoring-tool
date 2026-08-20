<?php

namespace App\Controllers;

use App\Models\File;
use App\Requests\File\CopyRequest;
use App\Requests\File\DeleteRequest;
use App\Requests\File\ExportRequest;
use App\Requests\File\ImportRequest;
use App\Requests\File\LoadRequest;
use App\Requests\File\UpdateExampleRequest;
use App\Services\FileExporter;
use App\Services\FileImporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Illuminate\Support\now;

class FileController
{
    public function get_my_files(Request $request)
    {
        $user= $request->user();
        $objects=File::where('user_id','=',$user->id)->whereNull('deleted_at')->get();
        
        return response()->json(
            ['files'=>$objects],200
        );
    }

    public function get_examples_by_others(Request $request)
    {
        $user= $request->user();
        $objects=File::where('user_id','<>',$user->id)->where('example','=',true)->whereNull('deleted_at')->get();
        
        return response()->json(
            ['files'=>$objects],200
        );
    }

    public function update_example(UpdateExampleRequest $request)
    {
        $user=$request->user();
        $params=$request->validated();
        $file=File::where('id','=',$params['file_id'])->whereBelongsTo($user)->whereNull('deleted_at')->first();
        if($file===null) {
            return response()->json(
                ['message'=>'A keresett fájl nem található.'],404
            );
        }

        $file->update(
            [
                'example'=>$params['example']
            ]
        );

        return response()->json(
            [
                'message'=>'Fájl frissítése sikeres',
                'file'=>$file
            ],200
        );
    }

    public function delete(DeleteRequest $request)
    {
        $user=$request->user();
        $params=$request->validated();
        $file=File::where('id','=',$params['file_id'])->whereBelongsTo($user)->whereNull('deleted_at')->first();
        if($file===null) {
            return response()->json(
                ['message'=>'A keresett fájl nem található.'],404
            );
        }

        DB::transaction(function () use ($file) {
            $deletedAt = now();
            
            $file->expressions()->update([
                'deleted_at' => $deletedAt,
            ]);

            $file->variables()->update([
                'deleted_at' => $deletedAt,
            ]);

            $file->deleted_at=$deletedAt;

            $file->save();
        });


        return response()->json(
            ['message'=>'Fájl törlése sikeres.'],200
        );
    }

    public function copy(CopyRequest $request)
    {
        $user=$request->user();
        $params=$request->validated();
        $file=File::where('id','=',$params['file_id'])->where('user_id','<>',$user->id)->where('example','=',true)->whereNull('deleted_at')->with(['expressions', 'variables'])->first();
        if($file===null) {
            return response()->json(
                ['message'=>'A keresett fájl nem található.'],404
            );
        }


       $copy=DB::transaction(function () use ($file, $user) {
            $copy = $file->replicate();

            $copy->user_id=$user->id;
            $copy->example=false;
            $copy->save();

            foreach ($file->expressions as $expression) {
                $expressionCopy=$expression->replicate();
                $expressionCopy->file_id = $copy->id;
                $expressionCopy->save();
            }

            foreach ($file->variables as $variable) {
                $variableCopy=$variable->replicate();
                $variableCopy->file_id = $copy->id;
                $variableCopy->save();
            }

            return $copy;
        });

        return response()->json(
            [
                'message'=>'Fájl másolása sikeres.',
                'file'=>$copy
            
            ],201
        );
    }

    public function export(ExportRequest $request, FileExporter $exporter)
    {
        $user=$request->user();
        $params=$request->validated();
        $file=File::where('id','=',$params['file_id'])->where('user_id','=',$user->id)->whereNull('deleted_at')->with(['expressions', 'variables'])->first();
        if($file===null) {
            return response()->json(
                ['message'=>'A keresett fájl nem található.'],404
            );
        }
        $content=$exporter->export($file);

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="export-file-' . $file->id . '-user-' . $user->username . '.txt"',
        ]);
    }

    public function import(ImportRequest $request, FileImporter $importer)
    {
        $user=$request->user();
        $request->validated();
        $file=$request->file('file')->get();
        
        $imported=$importer->import($user,$file);

        return response()->json(
           $imported['body'],$imported['status']
        );
    }

    public function load(LoadRequest $request)
    {
        $user=$request->user();
        $params=$request->validated();
        $file=File::where('id','=',$params['file_id'])->whereBelongsTo($user)->whereNull('deleted_at')->with(['expressions', 'variables'])->first();
        if($file===null) {
            return response()->json(
                ['message'=>'A keresett fájl nem található.'],404
            );
        }

        return response()->json(
            ['file'=>$file],200
        );
    }
}
