<?php

use App\Controllers\FileController;
use Illuminate\Support\Facades\Route;


Route::prefix('file')->group(function () {
    Route::post('/get_my_files', [FileController::class, 'get_my_files']);
});