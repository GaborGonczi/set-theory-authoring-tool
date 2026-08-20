<?php

use  Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    foreach (glob(app_path('Routes/Protected/*.php')) as $route) {
        require_once $route;
    }
});


foreach (glob(app_path('Routes/Public/*.php')) as $route) {
    require_once $route;
}
