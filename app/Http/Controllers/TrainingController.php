<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        if ($request['trainer_id']){
            $trainerId = $request->input('trainer_id');

            $trainings = Training::with('trainingVariation', 'room.club')
                                ->where('trainer_id', $trainerId)
                                ->get();
            return response()->json($trainings);
        }
        $trainings = Training::with('trainingVariation', 'trainer')->get();
        return response()->json($trainings);
    }

    public function create()
    {
        return view('trainings.create');
    }

    public function store(Request $request)
    {
        $training = Training::create($request->all());
        return response()->json($training, 201);
    }

    public function show(Training $training)
    {
        return view('trainings.show', compact('training'));
    }

    public function edit(Training $training)
    {
        return view('trainings.edit', compact('training'));
    }

    public function update(Request $request, Training $training)
    {
        $training->update($request->all());
        return redirect()->route('trainings.show', $training);
    }

    public function destroy(Training $training)
    {
        $training->delete();
        return redirect()->route('trainings.index');
    }
}