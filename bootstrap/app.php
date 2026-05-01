<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);

        // Configure redirect for unauthenticated users
        $middleware->redirectGuestsTo(fn () => route('login'));
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (! app()->environment('local', 'testing') && in_array($response->getStatusCode(), [404, 403, 419, 429, 500, 503])) {
                $debug = $request->query('debug') === '1' && config('app.debug');

                if ($response->getStatusCode() === 404) {
                    return Inertia::render('Errors/404', [
                        'debug' => $debug,
                        'error' => $debug ? [
                            'message' => $exception->getMessage() ?: 'Page not found',
                            'file' => $exception->getFile(),
                            'line' => $exception->getLine(),
                            'trace' => array_slice(
                                array_map(fn ($trace) => ($trace['file'] ?? 'unknown').':'.($trace['line'] ?? 'unknown').' - '.($trace['function'] ?? 'unknown'),
                                    $exception->getTrace()
                                ),
                                0,
                                10
                            ),
                        ] : null,
                    ])->toResponse($request)->setStatusCode(404);
                }

                return Inertia::render('Errors/Error', [
                    'status' => $response->getStatusCode(),
                    'message' => $exception->getMessage(),
                    'debug' => $debug,
                    'error' => $debug ? [
                        'exception' => get_class($exception),
                        'message' => $exception->getMessage(),
                        'file' => $exception->getFile(),
                        'line' => $exception->getLine(),
                        'trace' => array_slice(
                            array_map(fn ($trace) => ($trace['file'] ?? 'unknown').':'.($trace['line'] ?? 'unknown').' - '.($trace['function'] ?? 'unknown'),
                                $exception->getTrace()
                            ),
                            0,
                            10
                        ),
                    ] : null,
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();
