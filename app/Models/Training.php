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
        'room_id',
        'free_slots',
        'training_date'
    ];

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    public function training_variation()
    {
        return $this->belongsTo(TrainingVariation::class);
    }

    public function time()
    {
        return $this->belongsTo(TrainingTime::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function trainingParticipants()
{
    return $this->hasMany(TrainingParticipant::class);
}
}