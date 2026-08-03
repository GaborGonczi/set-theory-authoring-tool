<?php

namespace App\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'username'=>['required','string','min:3','alpha_num:ascii'],
            'password'=>['required','string','min:8','confirmed','regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).$/'],
        ];
    }

    public function messages()
    {
        return [
            'username.required'=>'Felhasználónév megadása kötelező.',
            'username.string'=>'A felhasználónévnek szövegnek kell lennie.',
            'username.min:3'=>'A felhasználónév hossza minimum 3 karakter.',
            'username.alpha_num:ascii'=>'A felhasználónév csak alfanumerikus karaktereket tartalmazhat.',
            'password.required'=>'Jelszó megadása kötelező.',
            'password.string'=>'A jelszónak szövegnek kell lennie.',
            'password.min:8'=>'A jelszó hossza minimum 8 karakter.',
            'password.regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+-]).$/'=>'A jelszónaklegalább 1 nagybetűt, legalább 1 kisbetűt, legalább 1 számot és legalább egy speciális karaktert (#, ?, !, @, $, %, ^, &, *, +, -) tartalmaznia kell.',
            'password.confirmed'=>'A két jelszó mezőnek meg kell egyeznie.'
        ];
    }
}
