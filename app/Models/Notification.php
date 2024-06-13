<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications'; // Имя таблицы в базе данных

    protected $fillable = ['message', 'sender_name', 'group_name']; // Поля, доступные для массового присваивания
    public $timestamps = false;
}
