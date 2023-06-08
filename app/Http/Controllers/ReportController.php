<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Club;
use Dompdf\Dompdf;
use App\Models\Training;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function generateReport(Request $request)
    {
        $clubId = $request['club_id'];
        $weekNumber = $request['week_number'];

        $pdf = new Dompdf();
        $club = Club::with('rooms')
            ->where('id', $clubId)
            ->first();

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

        foreach ($club->rooms as $room) {
            $trainings = Training::with('training_variation', 'room.club', 'trainingParticipants.user')
                ->whereRaw("WEEK(DATE_FORMAT(training_date, '%Y-%m-%d'), 1) = $weekNumber")
                ->where('room_id', $room->id)
                ->get();

            $html .= '<div style="page-break-inside: avoid;">'; // Изменено на page-break-inside

            $html .=  '<h3>Расписание занятий клуба "<strong>' . $club['name'] . '" на период</strong></h3>'.
                '<h3 class="room-heading">Зал "<strong>' . $room->name . '"</strong></h3>' .
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

            $timeSlots = [
                '7:00-8:20',
                '8:30-9:50',
                '10:00-11:20',
                '11:30-12:50',
                '13:00-14:20',
                '14:30-15:50',
                '16:00-17:20',
                '17:30-18:50',
                '19:00-20:20',
                '20:30-21:50'
            ];

            foreach ($timeSlots as $indexTime => $timeSlot) {
                $html .= '<tr>';
                $html .= '<td>' . $timeSlot . '</td>';

                for ($i = 1; $i <= 7; $i++) {

                    $training = $trainings->first(function ($item) use ($i, $timeSlot, $indexTime) {

                        return (Carbon::parse($item->training_date)->dayOfWeek == $i && $item->time->id == $indexTime + 1);
                    });

                    if ($training) {
                        $html .= '<td class="notfree">' . $training->training_variation->name . '</td>';
                    } else {
                        $html .= '<td class="free"></td>';
                    }
                }

                $html .= '</tr>';
            }

            $html .= '</tbody>' .
                '</table>' .
                '</div>'; // Закрытие контейнера таблицы с разделителем страниц
        }

        $html .= '</body></html>';

        $pdf->loadHtml($html);
        $pdf->setPaper('A4', 'portrait');

        $pdf->render();
        $pdf->stream('report.pdf', ['Attachment' => false]);
    }
}
