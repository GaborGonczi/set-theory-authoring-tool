<?php

namespace App\Requests\File;

use Illuminate\Foundation\Http\FormRequest;

class ImportRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'file'=>['required','file','mimetypes:text/plain',],
        ];
    }

    public function messages()
    {
        return [
            'file.required'=>'Fájl megadása kötelező.',
            'file.mimetypes'=>'A fájl típusának sima szövegesnek kell lennie.'
        ];
    }
}
