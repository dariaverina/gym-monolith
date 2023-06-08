<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingVariation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function club()
    {
        return $this->belongsTo(TrainingVariation::class);
    }
    public function name()
    {
        return $this->name;
    }
}
