<?php

namespace App\Controllers;

use Tymon\JWTAuth\JWTGuard;
use App\Models\User;
use App\Requests\Auth\LoginRequest;
use App\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard=auth('api');
    }

    public function login(LoginRequest $request)
    {   
        $params=$request->validated();
        return $this->attemptWithCredentials($params);
    }

    public function logout() {
      
        return $this->guard->logout();

    }

    public function register(RegisterRequest $request) {
        $params=$request->validated();
        if(User::where('name',$params['username'])->exists()){
            return response()->json([
                'message'=>'A felhasználónév foglalt'
            ],409);
        }
        
        $user=User::create([
            'name'=>$params['username'],
            'password'=>Hash::make($params['password'])
        ]);

        $this->attemptWithCredentials($params);

    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => $this->guard->factory()->getTTL() * 60,
            'user'=>$this->guard->user()
        ]);
    }

    protected function attemptWithCredentials($credentials=[]) {
          if(!$token=$this->guard->attempt($credentials)){
            return response()->json(
                ['message'=>'Nem megfelelő belépési adatok.']
            );
        }
        return $this->respondWithToken($token) ;
    }
}
