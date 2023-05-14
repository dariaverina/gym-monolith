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
        $validatedData = $request->validate([
            'training_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $existingBooking = TrainingParticipant::where('training_id', $validatedData['training_id'])
        ->where('user_id', $validatedData['user_id'])
        ->exists();

        if ($existingBooking) {
        return response()->json(['error' => 'This user is already booked for this training.'], 409);
        }
        
        $training = Training::findOrFail($validatedData['training_id']);
        if ($training->free_slots <= 0) {
            return response()->json(['message' => 'No available free slots.']);
        }
    
    
        $trainingParticipant = new TrainingParticipant();
        $trainingParticipant->training_id = $validatedData['training_id'];
        $trainingParticipant->user_id = $validatedData['user_id'];
        $trainingParticipant->save();

        $training->free_slots -= 1;
        $training->save();
    
        return response()->json(['message' => 'Booking created successfully.']);
    }

    
}