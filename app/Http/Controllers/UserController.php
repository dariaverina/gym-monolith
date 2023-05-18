<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userType = $request->input('user_type', null);

        $query = User::query();
        
        if ($userType !== null) {
            $query->where('user_type', $userType);
        }
        
        $users = $query->orderBy('id', 'desc')->paginate(10);
        
        $data = $users->map(function ($user) {
            $training_variation_names = $user->trainings->pluck('trainingVariation.name')->unique()->values();
            return array_merge((new UserResource($user))->toArray(request()), [
                'training_variations_names' => $training_variation_names,
            ]);
        });
        
        return response()->json($data);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user) , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($identifier)
    {
        $user = User::find($identifier);
    
        if(!$user) return response()->json(null, 404);
 
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request;
        // echo $request;exit;
        // $data = $request->validated();
        // if (isset($data['password'])) {
        //     $data['password'] = bcrypt($data['password']);
        // }

        // check if the request contains specific fields to update
        $user = User::find($id);
        $user->fill($request->only(['status', 'name']));
        // if (isset($data['status'])) {
        //    
        // }
        // if (isset($data['name'])) {
        //     $user->name = $data['name'];
        // }

        $user->save();

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}