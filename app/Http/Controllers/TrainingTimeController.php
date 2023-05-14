<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainingTime;

class TrainingTimeController extends Controller
{
    //
    public function index()
    {
        $trainingTimes = TrainingTime::all();
        return response()->json($trainingTimes);
        //
    }

}
