<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Models\Group;

class ScheduleController extends Controller
{
    public function store()
    {
        // Логин и пароль для авторизации
        $login = "d.verina";
        $password = "d41cdc79";

        // Создаем HTTP-клиент Guzzle
        $client = new Client([
            'cookies' => true, // Включаем поддержку куки
            'verify' => false, // Отключаем проверку SSL сертификата (может потребоваться)
        ]);

        try {
            // Отправляем POST-запрос на страницу авторизации
            $response = $client->request('POST', 'https://lk.ulstu.ru/?q=auth/login', [
                'form_params' => [
                    'login' => $login,
                    'password' => $password
                ]
            ]);

            // Проверяем статус ответа на успешную авторизацию
            if ($response->getStatusCode() === 200) {
                // Получаем все группы из базы данных
                $allGroups = Group::all();

                // Перебираем все группы и загружаем расписание для каждой группы
                foreach ($allGroups as $group) {
                    $scheduleResponse = $client->request('GET', 'https://time.ulstu.ru/api/1.0/timetable', [
                        'query' => ['filter' => $group->name]
                    ]);

                    // Проверяем статус ответа
                    if ($scheduleResponse->getStatusCode() === 200) {
                        // Получаем JSON-данные о расписании
                        $scheduleData = json_decode($scheduleResponse->getBody(), true)['response'];

                        // Перебираем недели в расписании
                        foreach ($scheduleData['weeks'] as $weekNumber => $week) {
                            // Перебираем дни в неделе
                            foreach ($week['days'] as $day) {
                                // Перебираем уроки в каждом дне
                                foreach ($day['lessons'] as $lessonNumber => $lessons) {
                                    foreach ($lessons as $lesson) {
                                        // Если урок не пустой
                                        if ($lesson) {
                                            // Создаем новую запись в таблице расписания
                                            Schedule::create([
                                                'group_name' => $lesson['group'],
                                                'week_number' => $weekNumber,
                                                'day_of_week' => $day['day'] + 1, // Устанавливаем день недели
                                                'lesson_number' => $lessonNumber + 1, // Устанавливаем номер урока
                                                'lesson_name' => $lesson['nameOfLesson'],
                                                'teacher' => $lesson['teacher'],
                                                'room' => $lesson['room'],
                                            ]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                return response()->json(['message' => 'Расписание успешно загружено'], 200);
            } else {
                return response()->json(['error' => 'Failed to authenticate'], $response->getStatusCode());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request)
    {
        // Получаем номер недели из запроса
        $weekNumber = $request->input('week_number');
        $groupName = $request->input('group_name');

         // Получаем расписание из базы данных по номеру недели и названию группы
        $schedule = Schedule::where('week_number', $weekNumber-6)
        ->where('group_name', $groupName)
        ->get();

        // Возвращаем расписание в формате JSON
        return response()->json($schedule);
    }
}
