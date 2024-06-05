<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'group_name',
        'week_number',
        'day_of_week',
        'lesson_number',
        'lesson_name',
        'teacher',
        'room',
    ];
    protected $table = 'schedule';
    public $timestamps = false;

    // Здесь вы можете определить любые другие свойства и методы для вашего класса Schedule
}