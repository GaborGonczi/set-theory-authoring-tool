<?php

use App\Controllers\HelpController;
use Illuminate\Support\Facades\Route;


Route::prefix('help')->group(function () {
    Route::post('/usage', [HelpController::class, 'usage']);
});