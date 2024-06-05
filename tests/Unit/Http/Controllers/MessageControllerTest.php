<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MessageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_teacher_can_send_message()
    {
        $teacher = User::factory()->create(['user_type' => 't']);
        $student = User::factory()->create(['user_type' => 's']);

        $messageData = [
            'recipient_id' => $student->id,
            'content' => 'Hello student!',
        ];

        $response = $this->actingAs($teacher)->postJson('/api/messages', $messageData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Message sent successfully']);

        $this->assertDatabaseHas('messages', [
            'sender_id' => $teacher->id,
            'recipient_id' => $student->id,
            'content' => 'Hello student!',
        ]);
        $this->assertTrue(true);
    }

    public function test_student_can_receive_messages()
    {
        $student = User::factory()->create(['user_type' => 's']);
        $teacher = User::factory()->create(['user_type' => 't']);
        $message = Message::factory()->create([
            'sender_id' => $teacher->id,
            'recipient_id' => $student->id,
            'content' => 'Hello student!',
        ]);

        $response = $this->actingAs($student)->getJson('/api/messages');

        $response->assertStatus(200)
            ->assertJsonFragment(['content' => 'Hello student!']);
        $this->assertTrue(true);
    }
}
