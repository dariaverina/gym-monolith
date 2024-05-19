<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use Dompdf\Dompdf;
use App\Models\Training;
use Carbon\Carbon;
use Intervention\Image\ImageManagerStatic as Image;

class ReportController extends Controller
{
    public function generateReport(Request $request)
    {

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



        // $imageWidth = 1200;
        // $imageHeight = 800;
        // $image = imagecreatetruecolor($imageWidth, $imageHeight);

        // // Настройка цвета фона
        // $whiteColor = imagecolorallocate($image, 255, 255, 255);

        // // Заливаем изображение белым фоном
        // imagefilledrectangle($image, 0, 0, $imageWidth, $imageHeight, $whiteColor);

        // // Цвет текста
        // $blackColor = imagecolorallocate($image, 0, 0, 0);

        // // Отрисовываем заголовок таблицы
        // imagestring($image, 5, 20, 10, 'Schedule', $blackColor);

        // // Отрисовываем ячейки таблицы
        // $cellWidth = ($imageWidth - 40) / 7;
        // $cellHeight = ($imageHeight - 20) / 8;

        // for ($i = 0; $i < 7; $i++) {
        //     for ($j = 0; $j < 8; $j++) {
        //         $x = 20 + $i * $cellWidth;
        //         $y = 20 + $j * $cellHeight;
        //         imagerectangle($image, $x, $y, $x + $cellWidth, $y + $cellHeight, $blackColor);
        //     }
        // }

        // // Генерируем уникальное имя файла с временной меткой
        // $filename = 'schedule_' . time() . '.png';

        // // Сохраняем изображение как файл
        // $imagePath = public_path('images/' . $filename);
        // imagepng($image, $imagePath);

        // // Освобождаем память, занятую изображением
        // imagedestroy($image);


        // Отправляем изображение в Telegram
        $response = \Illuminate\Support\Facades\Http::attach(
            'photo',
            file_get_contents($imagePath),
            $filename
        )->post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendPhoto', [
            'chat_id' => 1114156429,
            'caption' => 'Расписание на текущую неделю'
        ]);





        // $imageWidth = 400;
        // $imageHeight = 300;
        // $image = imagecreatetruecolor($imageWidth, $imageHeight);

        // // Настройка цвета фона
        // $whiteColor = imagecolorallocate($image, 255, 255, 255);

        // // Заливаем изображение белым фоном
        // imagefilledrectangle($image, 0, 0, $imageWidth, $imageHeight, $whiteColor);

        // // Генерируем уникальное имя файла с временной меткой
        // $filename = 'schedule_' . time() . '.png';

        // // Отправляем изображение в поток вывода
        // ob_start();
        // imagepng($image);
        // $image_data = ob_get_contents();
        // ob_end_clean();

        // // Освобождаем память, занятую изображением
        // imagedestroy($image);
        // return
        // (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendPhoto', 
        //     [
        //         'chat_id' => 1114156429,
        //         'photo' => 'data:image/png;base64,' . base64_encode($image_data),
        //         'caption' => 'Hello'
        //     ])->json()
        // );
            // }
        
            // Возвращаем ответ Telegram
            // return response()->json(['status' => 'ok']);
        // $clubId = $request['club_id'];
        // $weekNumber = $request['week_number'];
        // $startDate = Carbon::now()->setISODate(date('Y'), $weekNumber)->startOfWeek();
        // $endDate = Carbon::now()->setISODate(date('Y'), $weekNumber)->endOfWeek();

        // $pdf = new Dompdf();
        // $club = Club::with('rooms')
        //     ->where('id', $clubId)
        //     ->first();

        // $html = '<html><head><style>' .
        //     'body { font-family: DejaVu Sans; }' .
        //     'table { border-collapse: collapse; }' .
        //     'table, th, td { border: 1px solid black; padding: 8px; word-break: break-all; word-wrap: break-word; white-space: nowrap; }' . // Добавлено свойство white-space
        //     'td.free { background-color: #99FF99; }' .
        //     'td.notfree { background-color: #eb8771; }' .
        //     '.room-heading { text-align: center; }' . // Добавленный стиль для заголовка "Зал"
        //     '@page { margin: 1cm; }' . // Добавленный стиль для настройки полей страницы
        //     '</style></head>' .
        //     '<body>';

        // foreach ($club->rooms as $room) {
        //     $trainings = Training::with('training_variation', 'room.club', 'trainingParticipants.user')
        //         ->whereRaw("WEEK(DATE_FORMAT(training_date, '%Y-%m-%d'), 1) = $weekNumber")
        //         ->where('room_id', $room->id)
        //         ->get();

        //     $html .= '<div style="page-break-inside: avoid;">'; // Изменено на page-break-inside

        //     $html .= '<h3>Расписание занятий клуба "<strong>' . $club['name'] . '" на период ' . $startDate->format('d.m.Y') . '-' . $endDate->format('d.m.Y') . '</strong></h3>'.
        //         '<h3 class="room-heading">Зал "<strong>' . $room->name . '"</strong></h3>' .
        //         '<table>' .
        //         '<thead>' .
        //         '<tr>' .
        //         '<th></th>' .
        //         '<th>пн</th>' .
        //         '<th>вт</th>' .
        //         '<th>ср</th>' .
        //         '<th>чт</th>' .
        //         '<th>пт</th>' .
        //         '<th>сб</th>' .
        //         '<th>вс</th>' .
        //         '</tr>' .
        //         '</thead>' .
        //         '<tbody>';

        //     $timeSlots = [
        //         '1 пара',
        //         '2 пара',
        //         '3 пара',
        //         '4 пара',
        //         '5 пара',
        //         '6 пара',
        //         '7 пара',
        //         '8 пара',
        //     ];

        //     foreach ($timeSlots as $indexTime => $timeSlot) {
        //         $html .= '<tr>';
        //         $html .= '<td>' . $timeSlot . '</td>';

        //         for ($i = 1; $i <= 7; $i++) {

        //             $training = $trainings->first(function ($item) use ($i, $timeSlot, $indexTime) {

        //                 return (Carbon::parse($item->training_date)->dayOfWeek == $i && $item->time->id == $indexTime + 1);
        //             });

        //             if ($training) {
        //                 $html .= '<td class="notfree">' . $training->training_variation->name . '</td>';
        //             } else {
        //                 $html .= '<td class="free"></td>';
        //             }
        //         }

        //         $html .= '</tr>';
        //     }

        //     $html .= '</tbody>' .
        //         '</table>' .
        //         '</div>'; // Закрытие контейнера таблицы с разделителем страниц
        // }

        // $html .= '</body></html>';

        // $pdf->loadHtml($html);
        // $pdf->setPaper('A4', 'portrait');

        // $pdf->render();
        // $pdf->stream('report.pdf', ['Attachment' => false]);
    }
}
