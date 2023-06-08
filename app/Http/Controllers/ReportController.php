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
        $weekStart = $request['week_number'];

        $pdf = new Dompdf();
        $club = Club::with('rooms')
        ->where('id', $clubId)
        ->first();
    // echo($club);exit;

        // Get the trainings for the selected club and week
        $trainings = Training::with('training_variation', 'room.club', 'trainingParticipants.user')
            ->where('room_id', 3)
            ->get();
        $html = '<html><head><style>' .
            'body { font-family: DejaVu Sans; }' .
            'table { border-collapse: collapse; }' .
            'table, th, td { border: 1px solid black; padding: 8px; }' .
            'td.free { background-color: #99FF99; }' .
            'td.notfree { background-color: #eb8771; }' .
            
            '</style></head>' .
            '<body>' .
            '<h3>Расписание занятий клуба "<strong>' . $club['name'] . '" на период</strong></h3>' .
            '<h1>id клуба: ' . $clubId . '</h1>' .
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
                   
                    return (Carbon::parse($item->training_date)->dayOfWeek == $i && $item->time->id == $indexTime+1);
                }); 
                
                if ($training) {
                    // echo($training->training_variation);exit;
                    $html .= '<td class="notfree">' . $training->training_variation['name'] .'</td>';
                } else {
                    $html .= '<td class="free"></td>';
                }
            }

            $html .= '</tr>';
        }

        $html .= '</tbody>' .
            '</table>' .
            '</body>' .
            '</html>';

        $pdf->loadHtml($html);
        $pdf->setPaper('A4', 'portrait');

        $pdf->render();
        $pdf->stream('report.pdf', ['Attachment' => false]);
    }
}
