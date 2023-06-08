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
            $trainingWeek = $request->input('week_number');

            $trainings = Training::with('training_variation', 'room.club', 'trainingParticipants.user')
                ->where('trainer_id', $trainerId)
                ->whereRaw("WEEK(DATE_FORMAT(training_date, '%Y-%m-%d'), 1) = $trainingWeek")
                ->with('trainingVariation')
                ->get();
            return response()->json($trainings);
        }
        if ($request['filter']){
            $training_variations = $request->input('training_variations');
            if( $training_variations ){
                $training_variations = explode(',', $training_variations);
            }
           
            $training_timings = $request->input('training_timings');
            if( $training_timings ){
                $training_timings = explode(',', $training_timings);
            }

            $trainings = Training::with('training_variation', 'room.club', 'trainer')
            ->when(!empty($training_variations), function ($query) use ($training_variations) {
                return $query->whereIn('training_variation_id', $training_variations);
            })
            ->when(!empty($training_timings), function ($query) use ($training_timings) {
                return $query->whereIn('time_id', $training_timings);
            })
            ->get();
            return response()->json($trainings);
        }
        $trainings = Training::with('training_variation', 'trainer')->get();
        return response()->json($trainings);
    }

    public function create()
    {
        return view('trainings.create');
    }

    public function store(Request $request)
    {
        // echo($request);exit;
        $request['free_slots'] = $request['capacity'];
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

    public function delete($id)
    {
        // Find the review to be deleted
        $training = Training::find($id);

        if (!$id) {
            // If the review doesn't exist, return an error response
            return response()->json(['message' => 'Тренировка не найдена'], 404);
        }

        // Delete the review
        $training->delete();

        // Return a success response
        return response()->json(['message' => 'тренировка успешно удалена'], 200);
    }
}