<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->input('get_free_rooms')) {
            return $this->getFreeRooms($request);
        }

        $rooms = Room::all();
        return response()->json($rooms);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }

    public function getFreeRooms(Request $request)
    {
        $club_id = $request->input('club_id');
        $training_variation_id = $request->input('training_variation_id');
        $time_id = $request->input('time_id');
        $day_of_week = $request->input('day_of_week');
        
        // Получить список комнат, в которых можно проводить тренировки заданного типа
        $rooms = Room::where('club_id', $club_id)
        ->whereHas('trainingVariations', function($query) use ($training_variation_id) {
            $query->where('training_variation_id', $training_variation_id);
        })
        ->get();
        
        // Отфильтровать список комнат по времени и дню недели
        $availableRooms = $rooms->reject(function($room) use ($time_id, $day_of_week) {
            return $room->trainings()->where('time_id', $time_id)->where('day_of_week', $day_of_week)->exists();
        });
        
        // Вернуть свободные комнаты в формате JSON
        return response()->json($availableRooms);
    }
}
