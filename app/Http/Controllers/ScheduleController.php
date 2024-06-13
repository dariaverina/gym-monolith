<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schedule;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Models\Group;
use EvalMath\EvalMath;

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
        // Получаем параметры из запроса
        $weekNumber = $request->input('week_number');
        $groupName = $request->input('group_name');
        $teacherName = $request->input('teacher_name');

        // Инициализируем запрос к модели Schedule
        $query = Schedule::where('week_number', $weekNumber - 6);

        // Добавляем условие для группы или учителя в зависимости от наличия параметра
        if ($teacherName) {
            $query->where('teacher', $teacherName);
        } else if ($groupName) {
            $query->where('group_name', $groupName);
        }

        // Выполняем запрос и получаем расписание
        $schedule = $query->get();

        // Возвращаем расписание в формате JSON
        return response()->json($schedule);
    }
    
    public function updateSchedule(Request $request)
    {
        $validatedData = $request->validate([
            'schedule' => 'required|array',
            'schedule.*.id' => 'nullable|integer', // Позволяем id быть nullable
            'schedule.*.day_of_week' => 'required|integer|between:1,7',
            'schedule.*.lesson_number' => 'required|integer|between:1,8',
            'schedule.*.lesson_name' => 'required|string|max:255',
            'schedule.*.teacher' => 'nullable|string|max:255',
            'schedule.*.note' => 'nullable|string',
            'schedule.*.group_name' => 'required|string|max:255',
            'schedule.*.room' => 'required|string|max:255',
            'schedule.*.week_number' => 'required|integer', // Добавляем week_number
        ]);
    
        // Получаем массив id всех занятий на этой неделе для этой группы
        $existingIds = Schedule::whereIn('week_number', array_column($validatedData['schedule'], 'week_number'))
            ->where('group_name', $validatedData['schedule'][0]['group_name']) // Предполагаем, что группа в массиве всегда одна
            ->pluck('id')
            ->toArray();
    
        foreach ($validatedData['schedule'] as $lesson) {
            if (isset($lesson['id']) && in_array($lesson['id'], $existingIds)) {
                // Обновление существующей записи
                $schedule = Schedule::findOrFail($lesson['id']);
                $schedule->update($lesson);
                // Удаляем id из списка существующих, так как он был обработан
                $key = array_search($lesson['id'], $existingIds);
                unset($existingIds[$key]);
            } else {
                // Создание новой записи
                Schedule::create($lesson);
            }
        }
    
        // Удаление занятий, которые не были включены в массиве
        Schedule::whereIn('id', $existingIds)->delete();
    
        return response()->json(['message' => 'Schedule updated successfully'], 200);
    }
    
    
    public function search(Request $request)
    {
            // Получаем параметры из запроса
        $expression = $request->input('query');
        $weekNumber = 18;

        // Разбиваем выражение на компоненты
        $parts = preg_split('/(\(|\)|\|\||&&)/', $expression, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);

        // Инициализируем переменные для результата и оператора между условиями
        $result = [];
        $operator = null;
        $inParentheses = false;

        // Перебираем компоненты выражения
        foreach ($parts as $part) {
            $part = trim($part);

            // Определяем оператор между условиями
            if ($part === '||' || $part === '&&') {
                $operator = $part;
            } elseif ($part === '(') {
                // Если встретили открывающую скобку, переходим к обработке выражения в скобках
                $inParentheses = true;
            } elseif ($part === ')') {
                // Если встретили закрывающую скобку, завершаем обработку выражения в скобках
                $inParentheses = false;
            } else {
                // Выполняем поиск в расписании по каждому компоненту выражения
                $schedule = Schedule::where('group_name', 'like', "%$part%")
                                    ->orWhere('teacher', 'like', "%$part%")
                                    ->where('week_number', $weekNumber)
                                    ->get();

                // Объединяем результаты в соответствии с оператором
                if ($operator === '||') {
                    $result = array_merge($result, $schedule->toArray());
                } elseif ($operator === '&&') {
                    // Если это первый компонент или оператор "&&" еще не был определен, сохраняем результат
                    if ($result === []) {
                        $result = $schedule->toArray();
                    } else {
                        // Иначе сохраняем только пересечение результатов
                        $result = array_intersect_key($result, array_flip(array_column($schedule->toArray(), 'id')));
                    }
                } else {
                    // Если оператор не определен, просто сохраняем результат
                    $result = $schedule->toArray();
                }
            }
        }

        // Возвращаем результаты в формате JSON
        return response()->json($result);
    }

    public function updateNote(Request $request, $id)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'note' => 'nullable|string|max:255', // Allow 'note' to be nullable
        ]);

        try {
            // Find the lesson by ID
            $lesson = Schedule::findOrFail($id);

            // Update the note only if it's provided in the request
            if (isset($validatedData['note'])) {
                $lesson->note = $validatedData['note'];
            } else {
                $lesson->note = null; // Set to null if 'note' is not provided
            }

            $lesson->save();
            $this->sendTelegramNotification($lesson);

            return response()->json(['message' => 'Note updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating note', 'error' => $e->getMessage()], 500);
        }
    }

    private function sendTelegramNotification($lesson)
    {
        try {
            $daysOfWeek = [
                1 => 'понедельник',
                2 => 'вторник',
                3 => 'среда',
                4 => 'четверг',
                5 => 'пятница',
                6 => 'суббота',
                7 => 'воскресенье',
            ];
    
            // Map lesson time numeric values to their corresponding description
            $lessonTimes = [
                1 => '1 пара',
                2 => '2 пара',
                // Add more mappings as needed for other lesson times
            ];
    
            // Compose the message
            $message = '📝 Примечание к уроку обновлено:';
            $message .= "\nПреподаватель: " . $lesson->teacher;
            $message .= "\nЗанятие: " . $lesson->lesson_name;
            
            // Replace numeric day of the week with word
            if (isset($daysOfWeek[$lesson->day_of_week])) {
                $message .= "\nДень недели: " . $daysOfWeek[$lesson->day_of_week];
            } else {
                $message .= "\nДень недели: " . $lesson->day_of_week; // Fallback to numeric value
            }
            
            // Replace numeric lesson number with description
            if (isset($lessonTimes[$lesson->lesson_number])) {
                $message .= "\nВремя урока: " . $lessonTimes[$lesson->lesson_number];
            } else {
                $message .= "\nВремя урока: " . $lesson->lesson_number; // Fallback to numeric value
            }
    
            $message .= "\nПримечание: " . ($lesson->note ?? 'Отсутствует');

            // Fetch users with Telegram ID belonging to the group
            // $users = User::whereNotNull('telegram_id')->where('group_id', $lesson->group_id)->get();

           (\Illuminate\Support\Facades\Http::post('https://api.telegram.org/bot7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34/sendMessage', 
                [
                    'chat_id' => 1114156429,
                    'text' => '🧑‍🏫 Новое уведомление от преподавателя ' . $lesson->teacher . ":\n" . $message
                ])->json()
            );


            return true; // Notification sent successfully
        } catch (\Exception $e) {
            // Handle exception or log error
            return false; // Notification failed to send
        }
    }

    
    
}
