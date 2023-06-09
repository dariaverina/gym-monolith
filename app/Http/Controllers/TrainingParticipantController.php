<?php

namespace App\Http\Controllers;

use App\Models\TrainingParticipant;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingParticipantController extends Controller
{
    public function index(Request $request)
    {
        $trainingParticipants = TrainingParticipant::all();
        return response()->json($trainingParticipants);
    }

    public function store(Request $request)
    {
        if(!$request['user_id']){
            return response()->json(['message' => 'Войдите в аккаунт прежде чем записываться на тренировку.'], 500);
        }
        $validatedData = $request->validate([
            'training_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        
        
        $training = Training::findOrFail($validatedData['training_id']);
        if ($training->free_slots <= 0) {
            return response()->json(['message' => 'No available free slots.']);
        }
        $existingBooking = TrainingParticipant::whereHas('training', function ($query) use ($training) {
            $query->where('training_date', $training['training_date'])
                ->where('time_id', $training['time_id']);
        })
            ->where('user_id', $request['user_id'])
            ->exists();
    
        if ($existingBooking) {
            return response()->json(['message' => 'Вы уже записаны на тренировку в это время.'], 409);
        }
    
    
        $trainingParticipant = new TrainingParticipant();
        $trainingParticipant->training_id = $validatedData['training_id'];
        $trainingParticipant->user_id = $validatedData['user_id'];
        $trainingParticipant->save();

        $training->free_slots -= 1;
        $training->save();
    
        return response()->json(['message' => 'Booking created successfully.']);
    }

    public function delete(Request $request)
    {
        $userId = $request->input('user_id');
        $trainingId = $request->input('training_id');
        // Find the review to be deleted
                
        $participant = TrainingParticipant::where('training_id', $trainingId)
        ->where('user_id', $userId)
        ->first();

        if (!$participant) {
            // If the review doesn't exist, return an error response
            return response()->json(['message' => 'Сущность не найдена'], 404);
        }

        $participant->delete();

        $training = Training::findOrFail($trainingId);
        $training->free_slots += 1;
        $training->save();

        // Return a success response
        return response()->json(['message' => 'Сущность удалена'], 200);
    }
}