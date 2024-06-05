<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validatedData = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'recipient_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $message = Message::create($validatedData);

        return response()->json($message, 201);
    }

    public function getMessages(Request $request)
    {
        $userId = $request->input('user_id');

        $messages = Message::where('recipient_id', $userId)->orderBy('created_at', 'desc')->get();

        return response()->json($messages, 200);
    }
}
