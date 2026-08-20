<?php

use App\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::prefix('profile')->group(function () {
    Route::post('/info', [ProfileController::class, 'info']);
});