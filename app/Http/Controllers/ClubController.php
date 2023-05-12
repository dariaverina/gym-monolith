<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Room;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::with('rooms')->get();

        return response()->json($clubs);
    }

    public function store(Request $request)
    {
        $club = Club::create($request->all());

        return response()->json($club, 201);
    }

    public function show($identifier)
    {
        $club = Club::with('rooms')->find($identifier);
    
        if (!$club) {
            $club = Club::where('seo_name', $identifier)->first();
        }
        if(!$club) return response()->json(null, 404);
        
        return response()->json($club);
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);
        $club->update($request->all());

        $existingRoomIds = $club->rooms->pluck('id')->toArray();
        foreach ($request->rooms as $roomData) {
            $roomId = $roomData['id'] ?? null;
            $room = Room::find($roomId);
    
            if ($room) {
                $room->update($roomData);
            } else {
                $room = new Room($roomData);
                $room->club_id = $club->id;
                $room->save();
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
