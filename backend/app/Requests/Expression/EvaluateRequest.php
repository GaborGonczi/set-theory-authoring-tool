<?php

namespace App\Requests\Expression;

use Illuminate\Foundation\Http\FormRequest;

class EvaluateRequest extends FormRequest
{
    
    public function rules(): array
    {
        return [
            'statement'=>['required','string'],
            'noparse'=>['required','boolean'],
            'file_id'=>['prohibits:expression_id'],
            'expression_id'=>['prohibits:file_id']
        ];
    }

    public function messages()
    {
        return [
            'statement.required'=>'Kifejezés megadása kötelező.',
            'statement.string'=>'A kifejezésnek szövegesnek kell lennie.',
            'noparse.required'=> 'A kifejezés kezelésének módját meg kell adni. Igaz érték esetén szövegként, hamis érték esetén matematikai kifejezésként kerül értelmezésre.',
            'noparse.boolean'=> 'A kifejezés kezelésének módja csak igaz vagy hamis lehet.',
            'file_id.prohibits'=>'Fájlazonosító és kifejezésazonosító nem adható meg egyszerre.',
            'expression_id.prohibits'=>'Kifejezésazonosító és fájlazonosító nem adható meg egyszerre.'
        ];
    }
}
