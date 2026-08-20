<?php

namespace App\Controllers;

use App\Requests\Expression\EvaluateRequest;
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
}
