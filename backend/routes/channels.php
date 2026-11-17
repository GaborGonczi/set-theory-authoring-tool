<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('deleted-user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
},['guards' => ['api']]);
