<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;


    public function test_it_returns_error_for_invalid_credentials()
    {
        $invalidCredentials = [
            'email' => 'nonexistent@example.com',
            'password' => 'invalidpassword',
        ];

        $response = $this->postJson('/api/login', $invalidCredentials);

        $response->assertStatus(422)
            ->assertJson([
                'error' => 'No such account',
            ]);

        $this->assertGuest(); // Assert that the user is not authenticated
    }

    public function test_it_registers_user_successfully($user_type = 'c', $status='n')
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'user_type' => $user_type,
            'phone' => '123456789',
            'status' => $status
        ];

        $response = $this->postJson('/api/signup', $userData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'user_type' => $user_type,
            'phone' => '123456789',
        ]);

    }

    public function test_it_returns_error_for__banned_user()
    {
        $this->test_it_registers_user_successfully('t', 'n');
        $invalidCredentials = [
            'email' => 'john.doe@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/login', $invalidCredentials);

        $response->assertStatus(422)
            ->assertJson([
                'error' => 'Your account is not confirmed yet',
            ]);

    }

    public function test_it_returns_ok_for_active_user()
    {
        $this->test_it_registers_user_successfully('c', 'a');
        $validCredentials = [
            'email' => 'john.doe@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/login', $validCredentials);

        $response->assertStatus(200);

    }



}
