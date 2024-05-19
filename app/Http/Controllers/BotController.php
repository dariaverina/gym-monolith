<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Telegram\Bot\Laravel\Facades\Telegram;

class BotController extends Controller
{
    // public function handle(Request $request)
    // {
    //     $updates = Telegram::getWebhookUpdates();
    //     $message = $updates['message']['text'];
    //     $chatId = $updates['message']['chat']['id'];

    //     Telegram::sendMessage([
    //         'chat_id' => $chatId,
    //         'text' => 'Привет, вы отправили сообщение: ' . $message
    //     ]);
    // }
    public function index()
    {
        
        return [];
    }
}
