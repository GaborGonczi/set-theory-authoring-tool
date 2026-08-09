<?php

namespace App\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

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
}
