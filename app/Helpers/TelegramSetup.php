<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http; 

class TelegramSetup
{
    public static function setWebhook()
    {
        $token = '7078635996:AAFnCY1PV3chqoqpDodNR-qeeuPkao2HX34'; // Ваш токен
        $ngrokSubdomain = 'b1cc-95-26-103-196'; // Ваш ngrok поддомен

        // Отправка запроса для установки вебхука
        $response = Http::post("https://api.telegram.org/bot{$token}/setWebhook", [
            'url' => "https://{$ngrokSubdomain}.ngrok-free.app/telegram/webhook",
        ]);

        // Возвращаем результат запроса
        return $response->json();
    }
}
