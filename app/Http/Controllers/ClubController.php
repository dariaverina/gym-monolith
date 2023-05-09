<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::all();

        return response()->json($clubs);
    }

    public function store(Request $request)
    {
        $club = Club::create($request->all());

        return response()->json($club, 201);
    }

    public function show($identifier)
    {
        $club = Club::find($identifier);
    
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

        return response()->json($club, 200);
    }

    public function destroy($id)
    {
        Club::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
