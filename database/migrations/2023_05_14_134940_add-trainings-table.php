<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trainer_id')->constrained('users')->where('user_type', 't');
            $table->foreignId('training_variation_id')->constrained('training_variations');
            $table->foreignId('time_id')->constrained('training_times');
            $table->unsignedTinyInteger('day_of_week');
            $table->unsignedSmallInteger('capacity');
            $table->foreignId('room_id')->constrained('rooms');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainings');
    }
};
