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
        $groupId = $request->input('group_id', null);
    
        $query = User::query();
    
        if ($userType !== null) {
            $query->where('user_type', $userType);
        }
    
        if ($groupId !== null) {
            $query->where('group_id', $groupId);
        }
    
        $users = $query->orderBy('id', 'desc')->paginate(20);
    
        $data = $users->map(function ($user) {
            // Получение group_id из пользователя
            $groupId = $user->group_id;
            // Получение названия группы по group_id
            $groupName = $user->group ? $user->group->name : null;
            return array_merge((new UserResource($user))->toArray(request()), [
                'group_id' => $groupId,
                'group_name' => $groupName,
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
        $data['group_id'] = $request->input('group_id');
        echo($data);
        return;
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
       
        $user = User::find($id);
        $user->fill($request->only( ['name', 'group_id', 'email', 'privilege']));

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