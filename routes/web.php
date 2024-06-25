<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\KelasMapelController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');


    Route::group(['prefix' => 'user', 'middleware' => ['check.roles:admin']], function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('/new', [UserController::class, 'create'])->name('user.new');
        Route::post('/new', [UserController::class, 'store'])->name('user.store');

        Route::get('/edit/{user}', [UserController::class, 'edit'])->name('user.Edit');
        Route::patch('/edit/{user}', [UserController::class, 'update'])->name('user.update');

        Route::delete('/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    });

    Route::group(['prefix' => 'Kelas&Mapel', 'middleware' => ['check.roles:admin']], function () {
        Route::get('/', [KelasMapelController::class, 'index'])->name('Kelas&Mapel.index');
        Route::post('/new', [KelasMapelController::class, 'store'])->name('Kelas&Mapel.new');
        Route::get('/kelas/{kelas}', [KelasMapelController::class, 'edit'])->name('kelas.edit');
        Route::patch('/new/{alias}', [KelasMapelController::class, 'update'])->name('Kelas&Mapel.update');
        Route::delete('/mapel/{mapel}', [KelasMapelController::class, 'destroyMapel'])->name('mapel.destroy');
        Route::delete('/kelas/{kelas}', [KelasMapelController::class, 'destroyKelas'])->name('kelas.destroy');
    });

    Route::group(['prefix' => 'nilai', 'middleware' => ['check.roles:admin,guru']], function () {
        Route::get('/', [NilaiController::class, 'index'])->name('nilai.index');
        Route::get('/kelas/{kelas}', [NilaiController::class, 'show'])->name('nilai.show');
        Route::post('/kelas/{kelas}', [NilaiController::class, 'store'])->name('nilai.store');
        Route::patch('/kelas/{nilai}', [NilaiController::class, 'update'])->name('nilai.update');
    });
    Route::group(['prefix' => 'nilaiSiswa'], function () {
        Route::get('/', [NilaiController::class, 'nilaiSiswa'])->name('nilaiSiswa.index');
    });

    Route::group(['prefix' => 'kenaikan-kelas', 'middleware' => ['check.roles:admin,guru']], function () {
        Route::get('/', [KelasController::class, 'index'])->name('kenaikan-kelas.index');
        Route::get('/kelas/{kelas}', [KelasController::class, 'show'])->name('kenaikan-kelas.show');
        Route::patch('/kelas/{id}', [KelasController::class, 'update'])->name('kenaikan-kelas.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
