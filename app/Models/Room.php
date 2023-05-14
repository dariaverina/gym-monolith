<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'club_id',
        'capacity'
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function trainingVariations()
    {
        return $this->belongsToMany(TrainingVariation::class, 'room_training_variations');
    }
}
