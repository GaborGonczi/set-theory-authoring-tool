<?php

use App\Controllers\FileController;
use Illuminate\Support\Facades\Route;


Route::prefix('file')->group(function () {
    Route::post('/get_my_files', [FileController::class, 'get_my_files']);
    Route::post('/get_examples_by_others', [FileController::class, 'get_examples_by_others']);
    Route::post('/update_example', [FileController::class, 'update_example']);
    Route::post('/delete', [FileController::class, 'delete']);
    Route::post('/copy', [FileController::class, 'copy']);
    Route::post('/export', [FileController::class, 'export']);
});