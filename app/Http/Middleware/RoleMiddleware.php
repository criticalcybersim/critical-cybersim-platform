<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(403, 'Unauthorized access.');
        }

        // Check if user role matches or if user is super_admin (super_admin has access to all)
        $allowedRoles = [$role];
        if ($role === 'admin') {
            $allowedRoles[] = 'super_admin'; // super_admin can access admin routes
        }

        if (! in_array($user->role, $allowedRoles)) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
