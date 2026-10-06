<?php

namespace App\Controllers;

use App\Models\Expression;
use App\Requests\Expression\EvaluateRequest;
use App\Requests\Expression\GetFigureRequest;
use App\Services\InterpreterHost;

class ExpressionController
{
    public function evaluate(EvaluateRequest $request,InterpreterHost $container)
    {
        $user=$request->user();
        $params=$request->validated();
        $result=$container->process($user,$params);
        return response()->json(
            $result['body'],$result['status']
        );
 
    }

    public function get_figure(GetFigureRequest $request)
    {
        $user=$request->user();
        $params=$request->validated();

        $file_with_that_figure_belongs_to_authenticated_user=Expression::where('result','=',$params['name'])->whereNull('deleted_at')->whereHas('file',function ($query) use ($user) {
            $query->whereBelongsTo($user);
        })->exists();
        if(!$file_with_that_figure_belongs_to_authenticated_user) {
            return response()->json(
                ['message'=>'A keresett ábra nem található.'],404
            );
        }

        return response()->file(
            storage_path('images/'.$params['name'].'.png')
        );

    }
}
