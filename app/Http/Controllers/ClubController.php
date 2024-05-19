<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Room;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::with('rooms', 'rooms.trainingVariations')->get();
        
        return response()->json($clubs);
    }

    public function store(Request $request)
    {
        $club = Club::create($request->all());

        if ($request->rooms) foreach ($request->rooms as $roomData) {
            $room = new Room($roomData);
            $club->rooms()->save($room);

            if (isset($roomData['training_variations'])) {
                $room->trainingVariations()->sync($roomData['training_variations']);
            }
        }

        return response()->json($club, 201);
    }

    public function show($identifier)
    {
        $club = Club::with('rooms', 'rooms.trainingVariations')->find($identifier);
        // $club = Club::with(['rooms' => function ($query) {
        //     $query->with(['trainingVariations:id']);
        // }])->find($identifier);
    
        if (!$club) {
            $club = Club::where('seo_name', $identifier)->first();
        }
        if(!$club) return response()->json(null, 404);

        //training variations to array of ids
        $club = $club->toArray();
        foreach ($club['rooms'] as &$room) {
            $room['training_variations'] = array_column($room['training_variations'], 'id');
        }
        
        return response()->json($club);
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);
        $club->update($request->all());
        // echo($club);exit;
        $existingRoomIds = $club->rooms->pluck('id')->toArray();
        if ($request->rooms) foreach ($request->rooms as $roomData) {
            $roomId = $roomData['id'] ?? null;
            $room = Room::find($roomId);
    
            if ($room) {
                $room->update($roomData);
                if (isset($roomData['training_variations'])) {
                    $room->trainingVariations()->sync($roomData['training_variations']);
                }
            } else {
                $room = new Room($roomData);
                $room->club_id = $club->id;
                $room->save();
                if (isset($roomData['training_variations'])) {
                    $room->trainingVariations()->sync($roomData['training_variations']);
                }
            }
            // Remove the room ID from the existing ID array
            $existingRoomIds = array_diff($existingRoomIds, [$room->id]);
        }

        return response()->json($club, 200);
    }

    public function destroy($id)
    {
        Club::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
