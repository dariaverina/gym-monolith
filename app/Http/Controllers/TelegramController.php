<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class TelegramController extends Controller
{
    public function handleCallbackQuery(Request $request)
    {
        // Получите данные об обратном вызове от Telegram
        $callbackQuery = $request->all();

        // Далее обработайте эти данные в соответствии с вашей логикой
    }
}