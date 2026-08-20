<?php

namespace App\Controllers;

use Illuminate\Http\Request;

class ProfileController
{
    public function info(Request $request)
    {
        $user=$request->user();
        return response()->json(
            ['user'=>['username'=>$user->username]],200
        );

    }
}
