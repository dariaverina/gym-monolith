<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        // Проверяем, есть ли данные о расписании в запросе
        if (!$request->has('schedule')) {
            return response()->json(['error' => 'Расписание не найдено в запросе'], 400);
        }

        // Получаем данные о расписании из запроса
        $scheduleData = $request->input('schedule');

        // Перебираем дни в расписании
        foreach ($scheduleData as $day) {
            // Перебираем уроки в каждом дне
            foreach ($day['days'] as $lessonNumber => $lessons) {
                // Перебираем уроки в каждом дне
                foreach ($lessons['lessons'] as $lesson) {
                    // Если урок не пустой
                    if ($lesson) {
                        // Создаем новую запись в таблице расписания
                        Schedule::create([
                            'group_name' => $lesson['group']['name'],
                            'week_number' => $day['isOdd'] ? 1 : 2, // Устанавливаем номер недели
                            'day_of_week' => $lessonNumber + 1, // Устанавливаем день недели
                            'lesson_number' => $lessonNumber + 1, // Устанавливаем номер урока
                            'lesson_name' => $lesson['subject']['name'],
                            'teacher' => $lesson['subject']['teacher']['fullName'],
                            'room' => $lesson['room']['name'],
                        ]);
                    }
                }
            }
        }

        // Возвращаем ответ об успешном сохранении
        return response()->json(['message' => 'Расписание успешно загружено'], 200);
    }
    public function index(Request $request)
    {
        // Получаем номер недели из запроса
        $weekNumber = $request->input('week_number');

        // Получаем расписание из базы данных по номеру недели
        $schedule = Schedule::where('week_number', 1)->get();

        // Возвращаем расписание в формате JSON
        return response()->json($schedule);
    }
}
