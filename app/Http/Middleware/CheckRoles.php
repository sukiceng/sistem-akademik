<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CheckRoles
{
    public function handle($request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        foreach ($roles as $role) {
            if (Gate::allows($role, $user)) {
                return $next($request);
            }
        }

        // If the user does not have any of the required roles, redirect or abort
        return abort(403, 'Unauthorized action.');
    }
}
