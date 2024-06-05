<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TrainingParticipantController;
use App\Http\Controllers\ReportController;
use App\Models\Club;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use App\Models\Training;
use Carbon\Carbon;
use Intervention\Image\ImageManagerStatic as Image;



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

Route::get('/communication', function () {
    return view('communication');
});

Route::get('/users/students', function () {
    return view('students');
});

Route::get('/users/teachers', function () {
    return view('teachers');
});

Route::get('/users/workers', function () {
    return view('workers');
});

Route::get('/groups', function () {
    return view('groups');
});

Route::get('/messages', function () {
    return view('messages');
});

Route::get('/upload-schedule', function () {
    return view('upload-schedule');
});

Route::get('/bot', function () {
//     return
//     (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendMessage', 
//         [
//             'chat_id' => 1114156429,
//             'text' => 'some-text'
//         ])->json()
// );
    return view('bot');
});


Route::post('/telegram/webhook', function (Request $request) {
    $dompdf = new Dompdf();
    $html = '<html><head><style>' .
    'body { font-family: DejaVu Sans; }' .
    'table { border-collapse: collapse; }' .
    'table, th, td { border: 1px solid black; padding: 8px; word-break: break-all; word-wrap: break-word; white-space: nowrap; }' . // Добавлено свойство white-space
    'td.free { background-color: #99FF99; }' .
    'td.notfree { background-color: #eb8771; }' .
    '.room-heading { text-align: center; }' . // Добавленный стиль для заголовка "Зал"
    '@page { margin: 1cm; }' . // Добавленный стиль для настройки полей страницы
    '</style></head>' .
    '<body>';

    $html .= 
    '<table>' .
    '<thead>' .
    '<tr>' .
    '<th></th>' .
    '<th>пн</th>' .
    '<th>вт</th>' .
    '<th>ср</th>' .
    '<th>чт</th>' .
    '<th>пт</th>' .
    '<th>сб</th>' .
    '<th>вс</th>' .
    '</tr>' .
    '</thead>' .
    '<tbody>';

for ($i = 1; $i <= 8; $i++) {
    $html .= '<tr>' .
        '<th>' . $i . ' пара</th>' .
        '<td></td>' . // Пн
        '<td></td>' . // Вт
        '<td></td>' . // Ср
        '<td></td>' . // Чт
        '<td></td>' . // Пт
        '<td></td>' . // Сб
        '<td></td>' . // Вс
        '</tr>';
}

$html .= '</tbody>' .
    '</table>';


    $html .= '</tbody>' .
    '</table>' .
    '</body></html>';

    $dompdf->loadHtml($html);

    $dompdf->render();

    // Получаем изображение в формате PNG
    $image = $dompdf->output();
    $filename = 'schedule_' . time() . '.png';

    // Сохраняем изображение
    $imagePath = public_path('images/' . $filename);
    file_put_contents($imagePath, $image);
    $response = \Illuminate\Support\Facades\Http::attach(
        'photo',
        file_get_contents($imagePath),
        $filename
    )->post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendPhoto', [
        'chat_id' => 1114156429,
        'caption' => 'Расписание на текущую неделю'
    ]);
    // Получаем данные из входящего запроса от Telegram
    // $update = $request->all();

    // // Проверяем, была ли нажата кнопка "schedule"
    // // if (isset($update['callback_query']['data']) && $update['callback_query']['data'] === 'schedule') {
    //     // Отправляем ответ в Telegram
    //     return
    //     (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendMessage', 
    //     // (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendPhoto', 
    //         [
    //             'chat_id' => 1114156429,
    //             'text' => 'нажата кнопка'
    //             // 'photo' => 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1715040000&semt=ais'
    //         ])->json()
    // );
    // }

    // Возвращаем ответ Telegram
    // return response()->json(['status' => 'ok']);
});

Route::post('/send-notification', function (Request $request) {
        $message = $request->input('message');
        $name = $request->input('name');
        return
        (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendMessage', 
            [
                'chat_id' => 1114156429,
                'text' => '🧑‍🏫 Новое уведомление от преподавателя ' . $name . ":\n" . $message
            ])->json()
    );
});

// Route::post('/telegram/webhook', function (Request $request) {
//     $update = $request->all(); // Получите данные от Telegram
//     // Далее обработайте входящие данные в соответствии с вашей логикой
// });

Route::post('/bot/webhook', 'TelegramController@handleCallbackQuery');

Route::get('/register', function () {
    return view('register');
});

Route::get('/clubs', function () {
    return view('clubs');
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

Route::get('/help', function () { return view('help'); });

Route::get('/training-for-you', function () { return view('training-for-you'); });

Route::get('/reporting', function () { return view('reporting'); });


// Регистрация
Route::post('/register', 'Auth\RegisterController@register');
// Аутентификация
Route::post('/login', 'Auth\LoginController@login');
Route::post('/logout', 'Auth\LoginController@logout');

//clubs
Route::post('/clubs', [ClubController::class, 'store']);
Route::put('/clubs/{id}', [ClubController::class, 'update']);
Route::get('/clubs/{clubName}', function () {
    return view('club');
});


//training
Route::post('/training', [TrainingController::class, 'store']);
Route::post('/trainingparticipant', [TrainingParticipantController::class, 'store']);
Route::delete('/training/{id}', [TrainingController::class, 'delete']);
Route::delete('/trainingparticipant', [TrainingParticipantController::class, 'delete']);


//email
Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');
Route::post('/feedback', [FeedbackController::class, 'send'])->name('feedback.send');



Route::post('/reviews', [ReviewController::class, 'store']);


//review
Route::delete('/reviews/{id}', [ReviewController::class, 'delete']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']);

Route::post('/account', [UserController::class, 'store']);
Route::patch('/account', [UserController::class, 'update']);




//report
Route::get('/generate-report', [ReportController::class, 'generateReport']);

Route::get('/token', function (Request $request) {
    // $token = $request->session()->token();
 
    $token = csrf_token();
    return ($token);

});

