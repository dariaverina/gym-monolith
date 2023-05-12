<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainingVariation;

class TrainingVariationController extends Controller
{
    //
    public function index()
    {
        $trainingVariations = TrainingVariation::all();
        return response()->json($trainingVariations);
        //
    }

}
