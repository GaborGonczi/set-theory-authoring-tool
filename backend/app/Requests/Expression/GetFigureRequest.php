<?php

namespace App\Requests\Expression;

use Illuminate\Foundation\Http\FormRequest;

class GetFigureRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'name'=>['required','uuid:7'],
        ];
    }

    public function messages()
    {
        return [
            'name.required'=>'Ábranév megadása kötelező.',
            'name.uuid'=>'Az ábranévnek meg kell felelnie a UUID 7 verziónak.',
        ];
    }
}
