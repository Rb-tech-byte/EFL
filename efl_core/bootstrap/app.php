<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

// 1. Check for Nested Structure (Server: efl_core is inside public_html)
// We check this FIRST because on server, ../index.php exists.
// Locally, it does not (it's in ../public_html/index.php).
if (file_exists($app->basePath('../index.php'))) {
    $app->usePublicPath(realpath($app->basePath('../')));
}
// 2. Check for Sibling Structure (Local: efl_core is next to public_html)
elseif (is_dir($app->basePath('../public_html'))) {
    // We double check we aren't accidentally picking up a folder inside efl_core
    // by using realpath to confirm it's a sibling
    $app->usePublicPath(realpath($app->basePath('../public_html')));
}

return $app;
