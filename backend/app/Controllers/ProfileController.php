<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController
{
    public function info(Request $request)
    {
        $user=$request->user();

        $profileFields=User::where('id','=',$user->id)->first(['id','username']);

        if($profileFields===null) {
            return response()->json(
                ['message'=>'A keresett profil nem található'],404
            );
        }

        return response()->json(
            ['profileInfo'=>$profileFields],200
        );

    }
}
