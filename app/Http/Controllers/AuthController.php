<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use stdClass;
use App\Mail\FeedbackMailer;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'email' => $data['email'],
            'user_type' => $data['user_type'],
            'status' => ($data['user_type'] == 't') ? 'n' : 'a'
        ]);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->store('photos', 'public');
            $user->photo = $path;
            $user->save();
        }
        
        if ($user['status'] != 'a') return response(['success' => true]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response([
                'error' => 'No such account'
            ], 422);
        }
        $user = Auth::user();

        if($user->status === 'n') {
            return response([
                'error' => 'Your account is not confirmed yet'
            ], 422);
        }

        if ($user->user_type === 'm') {
            if ($request->has('verification_code')) {
                $code = $request->input('verification_code');
    
                // Проверка правильности кода
                if ($code === $user->two_factor_code) {
                    $user->two_factor_code = '';
                    $user->save();
    
                    $token = $user->createToken('main')->plainTextToken;
                    return response([
                        'user' => $user,
                        'token' => $token
                    ]);
                }
    
                return response([
                    'error' => 'Invalid verification code'
                ], 422);
            }
            else{
                // Генерируйте и сохраните уникальный код
                $code =  mt_rand(10000, 99999);
                $user->two_factor_code = $code;
                $user->save();
        

                // Отправьте сообщение с кодом
                $this->sendAuthCode($name = 'олег олег', $email='dashka400g@gmail.com', $code=$code); // Замените эту функцию на свою реализацию
        
                return response([
                    'requires_2fa' => true,
                ]);
            }
        }

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }

    public function verifyTwoFactorCode(Request $request)
    {
        $request->validate([
            'code' => 'required',
        ]);

        $user = Auth::user();
        $providedCode = $request->input('code');

        if ($user->two_factor_code === $providedCode) {
            $user->two_factor_code = null;
            $user->save();

            $token = $user->createToken('main')->plainTextToken;
            return response([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return response([
            'error' => 'Invalid verification code',
        ], 422);
    }

    public function sendAuthCode($name, $email, $code) {
        // $request->validate([
        //     'name' => 'required|max:100',
        //     'email' => 'required|email|max:100',
        //     'message' => 'required|max:500',
        // ]);

        $data = new stdClass();
        $data->name = $name;
        $data->email = $email;
        $data->message = $code;
        Mail::to($data->email)->send(new FeedbackMailer($data));
        // return redirect()->route('feedback.index')
        //     ->with('success', 'Ваше сообщение успешно отправлено');
    }

    function generateUniqueCode() {
        $code = mt_rand(10000, 99999); // Генерация случайного числа от 10000 до 99999

        return $code;
    }
    
}