<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Models\Group;

class GroupController extends Controller
{
    public function fetchGroups()
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
                // Запрос к API для получения групп
                $response = $client->request('GET', 'https://time.ulstu.ru/api/1.0/groups');

                // Проверяем статус ответа
                if ($response->getStatusCode() === 200) {
                    // Получаем JSON-данные и возвращаем их в ответе
                    $groups = json_decode($response->getBody(), true);
                    // Сохраняем группы в базу данных
                    foreach ($groups['response'] as $groupName) {
                        // Создаем или обновляем запись в базе данных
                        Group::updateOrCreate([
                                    'name' => $groupName,
                                    'university_id' => 1
                                ]);
                    }
                    return response()->json($groups);
                } else {
                    return response()->json(['error' => 'Failed to fetch groups'], $response->getStatusCode());
                }
            } else {
                return response()->json(['error' => 'Failed to authenticate'], $response->getStatusCode());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getGroups()
    {
        $groups = Group::all();
        return response()->json($groups);
    }


    public function updateGroups(Request $request)
    {
        // $groups = $request->input('groups');

        // // Clear existing groups
        // Group::truncate();

        // // Insert new groups
        // foreach ($groups as $group) {
        //     Group::create([
        //         'name' => $group['name'],
        //         'university_id' => 1
        //     ]);
        // }

        return response()->json(['message' => 'Groups updated successfully'], 200);
    }


    public function updateGroup(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $group = Group::findOrFail($id);
        $group->update([
            'name' => $request->name
        ]);

        return response()->json($group);
    }

    public function createGroup(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $university_id = 1;

        $group = Group::create([
            'name' => $request->name,
            'university_id' => $university_id
        ]);

        return response()->json($group, 201);
    }

    public function deleteGroup($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json(null, 204);
    }

    private function getUniversityId()
    {
        return config('app.university_id', 1); // Default to 1 if not set
    }
}
