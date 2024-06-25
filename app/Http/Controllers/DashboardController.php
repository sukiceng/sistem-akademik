<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    function index(): Response
    {
        $data  = [
            'User' => User::with('role')->get(),
            'MapelCount' => Mapel::count(),
            'KelasCount' => Kelas::count(),
        ];
        return Inertia::render('Dashboard/Home', ['data' => $data]);
    }
}
