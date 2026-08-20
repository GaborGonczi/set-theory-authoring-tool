<?php

namespace App\Requests\File;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExampleRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'file_id'=>['required'],
            'example'=>['required','boolean:strict'],
        ];
    }

    public function messages()
    {
        return [
            'file_id.required'=>'Fájlazonosító megadása kötelező.',
            'example.required'=>'Az example mező megadása kötelező.',
            'example.boolean'=>'Az example mező értéke csak logikai érték lehet.',
        ];
    }
}
