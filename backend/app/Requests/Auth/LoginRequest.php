<?php

namespace App\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'username'=>['required'],
            'password'=>['required']
        ];
    }

    public function messages()
    {
        return [
            'username.required'=>'Felhasználónév megadása kötelező.',
            'password.required'=>'Jelszó megadása kötelező.',
        ];
    }
}
