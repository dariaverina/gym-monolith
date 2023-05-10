<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClubController;

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
Route::get('/clubs', function () {
    $clubs = Club::all();
    return response()->json($clubs);
});
Route::get('clubs/{idOrSeoName}', [ClubController::class, 'show']);

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

