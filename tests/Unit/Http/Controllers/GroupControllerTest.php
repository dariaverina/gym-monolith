<?php
namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_group()
    {
        $admin = User::factory()->create(['user_type' => 'admin']);
        $groupData = [
            'name' => 'New Group',
            'description' => 'Group description',
        ];

        $response = $this->actingAs($admin)->postJson('/api/groups', $groupData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Group created successfully']);

        $this->assertDatabaseHas('groups', [
            'name' => 'New Group',
            'description' => 'Group description',
        ]);
    }

    public function test_user_can_get_groups()
    {
        $user = User::factory()->create();
        Group::factory()->count(3)->create();

        $response = $this->actingAs($user)->getJson('/api/groups');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }
}
