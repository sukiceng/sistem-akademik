<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate as FacadesGate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        FacadesGate::define('admin', fn (User $user) => $user->role_id === 3);
        FacadesGate::define('guru', fn (User $user) => $user->role_id === 2);
        FacadesGate::define('siswa', fn (User $user) => $user->role_id === 1);
    }
}
