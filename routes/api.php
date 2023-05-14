<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\TrainingVariationController;
use App\Http\Controllers\TrainingTimeController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\RoomController;

use App\Models\Club;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//clubs
Route::post('/clubs', [ClubController::class, 'store']);
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('clubs/{idOrSeoName}', [ClubController::class, 'show']);
Route::put('/clubs/{id}', [ClubController::class, 'update']);
// Route::get('/clubs', function () {
//     $clubs = Club::all();
//     return response()->json($clubs);
// });

//Training variations
Route::get('/trainingvariations', [TrainingVariationController::class, 'index']);
Route::get('/trainingtimes', [TrainingTimeController::class, 'index']);

//trainings
Route::get('/trainings', [TrainingController::class, 'index']);
Route::post('/trainings', [TrainingController::class, 'store']);

//rooms
Route::get('/rooms', [RoomController::class, 'index']);

//users
Route::get('/users',  [UserController::class, 'index']);
Route::patch('/users/{id}', [UserController::class, 'update']);

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::apiResource('/users', UserController::class);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});

