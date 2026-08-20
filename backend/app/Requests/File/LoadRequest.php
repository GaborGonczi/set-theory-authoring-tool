<?php

namespace App\Requests\File;

use Illuminate\Foundation\Http\FormRequest;

class LoadRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'file_id'=>['required'],
        ];
    }

    public function messages()
    {
        return [
            'file_id.required'=>'Fájlazonosító megadása kötelező.',
        ];
    }
}
