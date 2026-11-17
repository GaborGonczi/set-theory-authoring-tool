<?php

use App\Commands\DeleteDemoAccounts;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Request as BaseRequest;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withBroadcasting(
        __DIR__.'/../routes/channels.php',
        ['middleware' => ['api']]
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->redirectGuestsTo(null);
        $middleware->trustProxies(
            at: '172.19.0.5',
            headers: BaseRequest::HEADER_X_FORWARDED_FOR |
                     BaseRequest::HEADER_X_FORWARDED_HOST |
                     BaseRequest::HEADER_X_FORWARDED_PORT |
                     BaseRequest::HEADER_X_FORWARDED_PROTO
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
        $exceptions->render(function (
            AuthenticationException $e,
            Request $request
        ) {
            if ($request->is('api/*')) {
                return response()->json(
                    ['message' => 'A munkameneted lejárt. Kérjük, jelentkezz be újra.'],401
                );
            }
        });
    })
    ->withCommands([
        __DIR__.'/../app/Commands',
    ])
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command(DeleteDemoAccounts::class)
        ->dailyAt('00:00')
        ->timezone('UTC')
        ->withoutOverlapping();
    })->create();
