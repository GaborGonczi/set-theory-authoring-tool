<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table(key: 'id')]
#[Fillable([
    'file_id',
    'statement',
    'result',
    'start',
    'end',
    'noparse',
    'row',

])]
class Expression extends Model
{
    use SoftDeletes;

    public function getLengthAttribute()
    {
        return $this->end - $this->start;
    }

    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
