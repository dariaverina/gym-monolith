<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'trainer_id',
        'training_variation_id',
        'time_id',
        'day_of_week',
        'capacity',
        'room_id'
    ];

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    public function trainingVariation()
    {
        return $this->belongsTo(TrainingVariation::class, 'training_variation_id')->select('id', 'name');
    }

    public function time()
    {
        return $this->belongsTo(Time::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}