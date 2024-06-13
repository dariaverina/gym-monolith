<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $message = $request->input('message');
        $name = $request->input('name');
        $group_name = $request->input('group_name');

        // Сохранение уведомления в базе данных
        Notification::create([
            'message' => $message,
            'sender_name' => $name,
        ]);

        // Получение пользователей, принадлежащих группе
        $users = User::whereNotNull('telegram_id')
                     ->where('group_name', $group_name)
                     ->get();

        // Отправка уведомления каждому пользователю
        foreach ($users as $user) {
            Http::post('https://api.telegram.org/bot<TOKEN>/sendMessage', [
                'chat_id' => $user->telegram_id,
                'text' => '🧑‍🏫 Новое уведомление от преподавателя ' . $name . ":\n" . $message,
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Уведомление успешно отправлено и сохранено']);
    }

    public function getNotifications(Request $request)
    {
        $group_name = $request->query('group_name');

        if ($group_name) {
            $notifications = Notification::where('group_name', $group_name)->get();
        } else {
            $sender_name = $request->query('sender_name');
            $notifications = Notification::where('sender_name', $sender_name)->get();
        }

        return response()->json($notifications);
    }

    
}
