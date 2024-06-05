<?php
namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\Schedule;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScheduleControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_schedule()
    {
        $admin = User::factory()->create(['user_type' => 'admin']);
        $schedule = Schedule::factory()->create();

        $scheduleData = [
            'course' => 'New Course',
            'time' => '10:00',
            'day' => 'Monday',
        ];

        $response = $this->actingAs($admin)->putJson("/api/schedules/{$schedule->id}", $scheduleData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Schedule updated successfully']);

        $this->assertDatabaseHas('schedules', [
            'id' => $schedule->id,
            'course' => 'New Course',
            'time' => '10:00',
            'day' => 'Monday',
        ]);
    }
}
