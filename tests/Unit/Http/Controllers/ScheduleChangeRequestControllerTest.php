<?php
namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\ScheduleChangeRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScheduleChangeRequestControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_schedule_change_request()
    {
        $user = User::factory()->create();
        $changeRequestData = [
            'schedule_id' => 1,
            'requested_time' => '11:00',
            'reason' => 'Conflict with another class',
        ];

        $response = $this->actingAs($user)->postJson('/api/schedule-change-requests', $changeRequestData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Schedule change request submitted successfully']);

        $this->assertDatabaseHas('schedule_change_requests', [
            'schedule_id' => 1,
            'requested_time' => '11:00',
            'reason' => 'Conflict with another class',
        ]);
    }

    public function test_admin_can_approve_schedule_change_request()
    {
        $admin = User::factory()->create(['user_type' => 'admin']);
        $changeRequest = ScheduleChangeRequest::factory()->create(['status' => 'pending']);

        $response = $this->actingAs($admin)->putJson("/api/schedule-change-requests/{$changeRequest->id}/approve");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Schedule change request approved']);

        $this->assertDatabaseHas('schedule_change_requests', [
            'id' => $changeRequest->id,
            'status' => 'approved',
        ]);
    }
}
