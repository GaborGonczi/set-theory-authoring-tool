<?php

namespace App\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tymon\JWTAuth\JWTGuard;
use Illuminate\Support\Facades\Hash;

class DemoController
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard=auth('api');
    }
    public function up()
    {
        $user=User::create([
            'username'=>'demo_' . Str::lower(Str::random(8)),
            'password'=>Hash::make(Str::lower(Str::random(8)))
        ]);
        $token=$this->guard->login($user);
        return $this->respondWithToken($token);

    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => $this->guard->factory()->getTTL() * 25,
            'user'=>$this->guard->user(),
        ],200);
    }
}
