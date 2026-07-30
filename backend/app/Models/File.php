<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table(key: 'id')]
#[Fillable([
    'user_id',
    'example',    
])]
class File extends Model
{
    use SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function expression(): HasMany
    {
        return $this->hasMany(Expression::class);
    }

    public function variable(): HasMany
    {
        return $this->hasMany(Variable::class);
    }
    
}
