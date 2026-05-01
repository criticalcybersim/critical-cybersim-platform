<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class ErrorController extends Controller
{
    /**
     * Render a 404 error page
     */
    public function notFound(Request $request)
    {
        $debug = $request->query('debug') === '1' && config('app.debug');

        return Inertia::render('Errors/404', [
            'debug' => $debug,
            'error' => $debug ? [
                'message' => 'Route not found',
                'file' => null,
                'line' => null,
                'trace' => [],
            ] : null,
        ])->toResponse($request)->setStatusCode(404);
    }

    /**
     * Render a generic error page
     */
    public function show(Request $request, int $status = 500, string $message = null, Throwable $exception = null)
    {
        $debug = $request->query('debug') === '1' && config('app.debug');

        $errorData = [
            'status' => $status,
            'message' => $message,
            'debug' => $debug,
        ];

        if ($debug && $exception) {
            $errorData['error'] = [
                'exception' => get_class($exception),
                'message' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => array_slice(
                    array_map(fn($trace) => 
                        ($trace['file'] ?? 'unknown') . ':' . ($trace['line'] ?? 'unknown') . ' - ' . ($trace['function'] ?? 'unknown'),
                        $exception->getTrace()
                    ),
                    0,
                    10
                ),
            ];
        }

        return Inertia::render('Errors/Error', $errorData)
            ->toResponse($request)
            ->setStatusCode($status);
    }
}
