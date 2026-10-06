<?php

use App\Controllers\ExpressionController;
use Illuminate\Support\Facades\Route;


Route::prefix('expression')->group(function () {
    Route::post('/evaluate', [ExpressionController::class, 'evaluate']);
    Route::post('/get_figure', [ExpressionController::class, 'get_figure']);
});