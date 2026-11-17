<?php

use App\Controllers\DemoController;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;


Route::prefix('demo')->group(function () {
    Route::post('/up', [DemoController::class, 'up']);
});

