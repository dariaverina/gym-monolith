<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TrainingParticipantController;
use App\Models\Club;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/register', function () {
    return view('register');
});

Route::get('/clubs', function () {
    return view('clubs');
});

Route::get('/clubs/{clubName}', function () {
    return view('club');
});

Route::get('/users', function () {
    return view('users');
});

Route::get('/schedule', function () {
    return view('schedule');
});

Route::get('/trainers', function () {
    return view('trainers');
});

Route::get('/trainers/{id}', function () {
    return view('trainer');
});

Route::get('/account', function () { return view('account'); });

Route::get('/training-for-you', function () { return view('training-for-you'); });


// Регистрация
Route::post('/register', 'Auth\RegisterController@register');
// Аутентификация
Route::post('/login', 'Auth\LoginController@login');
Route::post('/logout', 'Auth\LoginController@logout');

//clubs
Route::post('/clubs', [ClubController::class, 'store']);
Route::put('/clubs/{id}', [ClubController::class, 'update']);

//training
Route::post('/training', [TrainingController::class, 'store']);
Route::post('/trainingparticipant', [TrainingParticipantController::class, 'store']);
// Route::get('/clubs', [ClubController::class, 'index']);

// Route::get('/clubs', [ClubController::class, 'index']);
// Route::get('/clubs/{id}', [ClubController::class, 'show']);


//email
Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');
Route::post('/feedback', [FeedbackController::class, 'send'])->name('feedback.send');

Route::post('/reviews', [ReviewController::class, 'store']);