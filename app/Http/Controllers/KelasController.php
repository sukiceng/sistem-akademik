<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Nilai;
use App\Models\Siswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelasController extends Controller
{
    function index(): Response
    {
        // NOTE : Reformat Data
        try {
            $user = auth()->user();
            // NOTE : Admin Role
            if ($user->role_id == 3) {

                $data = [
                    'kelas' => Kelas::with('Siswa')->with('Wali')->with('guruMapel')
                        ->orderBy('tahun_ajaran', 'desc')
                        ->orderBy('nama_kelas')
                        ->get(),
                    'tahun_ajar' => Kelas::select('tahun_ajaran')->groupBy('tahun_ajaran')->get(),
                    'guru'  => Guru::orderBy('nama_guru')->get(),
                ];
            }
            if ($user->role_id == 2) {
                $guruId =  Guru::where('user_id', $user->id)->pluck('id');
                $data = [
                    'kelas' => Kelas::with('Siswa')->with('Wali')->with('guruMapel')
                        ->orderBy('tahun_ajaran', 'desc')
                        ->orderBy('nama_kelas')
                        ->where('guru_id', $guruId)
                        ->get(),
                    'tahun_ajar' => Kelas::select('tahun_ajaran')->groupBy('tahun_ajaran')->get(),
                    'guru'  => Guru::orderBy('nama_guru')->get(),
                ];
            }

            return Inertia::render('Dashboard/KenaikanKelas/Index', [
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return Inertia::render('Dashboard/KenaikanKelas/Index', [
                'error' => $th->getMessage(),
            ]);
        }
    }
    function show(Kelas $kelas): Response
    {
        try {
            $data = [
                'data' => Kelas::with('Siswa')->with('Wali')->with('Mapel')->with('guruMapel')->where('id', $kelas->id)->first(),
                'listKelas' => Kelas::orderBy('tahun_ajaran', 'desc')->orderBy('nama_kelas',)->get(),

            ];

            return Inertia::render('Dashboard/KenaikanKelas/NaikKelas', [
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            dd($th);
            return Inertia::render('Dashboard/KenaikanKelas/Index', [$th->getMessage()]);
        }
    }

    function update(Request $request): RedirectResponse
    {
        try {
            $siswa = Siswa::find($request['siswa_id']);

            $siswa->update([
                'kelas_id' => $request['kelas_id'],
            ]);
            return redirect()->back()
                ->with('success', 'Kenaikan Kelas Berhasil di ubah.');
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return redirect()->back()
                ->with('error', 'Kenaikan Kelas Gagal diubah.');
        }
    }
}
