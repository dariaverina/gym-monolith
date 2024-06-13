<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'user_type' => $this->user_type,
            'status' => $this->status,
            'group_id' => $this->group_id,
            'privilege' => $this->privilege,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}