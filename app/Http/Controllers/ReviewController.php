<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        // Валидация данных
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'target_user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'rating' => 'required|integer',
        ]);

        // Проверка, был ли уже оставлен отзыв пользователем
        $existingReview = Review::where('user_id', $validatedData['user_id'])
                                ->where('target_user_id', $validatedData['target_user_id'])
                                ->first();

        if ($existingReview) {
            // Возвращение ошибки, если отзыв уже был оставлен
            return response()->json(['message' => 'Вы уже оставили отзыв для данного пользователя'], 400);
        }

        // Создание отзыва
        $review = new Review();
        $review->fill($validatedData);

        // Связь с пользователем, оставляющим отзыв
        $user = User::findOrFail($validatedData['user_id']);
        $review->user()->associate($user);

        // Связь с пользователем, о котором оставляют отзыв
        $targetUser = User::findOrFail($validatedData['target_user_id']);
        $review->targetUser()->associate($targetUser);

        // Сохранение отзыва
        $review->save();

        // Возвращение успешного ответа
        return response()->json(['message' => 'Отзыв успешно создан'], 201);
    }

    public function index(Request $request)
    {
        // Получение всех отзывов
        $reviews = Review::select('reviews.*', DB::raw('AVG(reviews.rating) as average_rating'))
                ->groupBy('reviews.id')
                ->get();

        // Returning reviews as JSON
        return response()->json($reviews);
    }
    public function show($trainerId)
    {
        $reviews = Review::where('target_user_id', $trainerId)
                    ->join('users', 'reviews.user_id', '=', 'users.id')
                    ->select('reviews.*', 'users.name')
                    ->get();

        $averageRating = Review::where('target_user_id', $trainerId)->avg('rating');

        // Returning reviews and average rating as JSON
        return response()->json([
            'reviews' => $reviews,
            'average_rating' => $averageRating,
        ]);
    }

    public function delete($reviewId)
    {
        // Find the review to be deleted
        $review = Review::find($reviewId);

        if (!$review) {
            // If the review doesn't exist, return an error response
            return response()->json(['message' => 'Отзыв не найден'], 404);
        }

        // Delete the review
        $review->delete();

        // Return a success response
        return response()->json(['message' => 'Отзыв успешно удален'], 200);
    }

    public function update(Request $request, $id)
    {
        // Валидация данных
        $validatedData = $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer',
        ]);

        // Проверка, существует ли отзыв с указанным идентификатором
        $review = Review::find($id);

        if (!$review) {
            // Возвращение ошибки, если отзыв не найден
            return response()->json(['message' => 'Отзыв не найден'], 404);
        }

        // Обновление отзыва
        $review->content = $validatedData['content'];
        $review->rating = $validatedData['rating'];

        // Сохранение обновленного отзыва
        $review->save();

        // Возвращение успешного ответа
        return response()->json(['message' => 'Отзыв успешно обновлен'], 200);
    }

}
