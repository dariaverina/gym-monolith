<?php
namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TelegramControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_telegram_settings()
    {
        $user = User::factory()->create();
        $telegramSettings = [
            'telegram_id' => '123456789',
            'notification_time' => '09:00',
            'notifications_enabled' => true,
        ];

        $response = $this->actingAs($user)->putJson('/api/telegram/settings', $telegramSettings);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Telegram settings updated successfully']);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'telegram_id' => '123456789',
            'notification_time' => '09:00',
            'notifications_enabled' => true,
        ]);
        
    }
}
