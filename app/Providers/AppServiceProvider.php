<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\TelegramSetup;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        TelegramSetup::setWebhook();
    }
}
