<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Nilai;
use App\Models\PivotGuruKelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class NilaiController extends Controller
{
    function index(): Response
    {
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
            // NOTE : Guru Role
            if ($user->role_id == 2) {
                $guruId =  Guru::where('user_id', $user->id)->pluck('id');
                $data = [
                    'guru' => Guru::orderBy('nama_guru')->get(),
                    'kelas' => Kelas::with('Siswa')->with('Wali')
                        ->with('guruMapel')
                        ->where('guru_id', $guruId)
                        ->orWhereHas('guruMapel', function ($query) use ($guruId) {
                            $query->where('guru_id', $guruId);
                        })
                        ->orderBy('tahun_ajaran', 'desc')
                        ->orderBy('nama_kelas')
                        ->get(),
                    'tahun_ajar' => Kelas::select('tahun_ajaran')->groupBy('tahun_ajaran')->get(),
                ];
            }
            // dd($data);
            return Inertia::render('Dashboard/Nilai/Index', [
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            dd($th);
            return Inertia::render('Dashboard/Nilai/Index', [$th->getMessage()]);
        }
    }
    function show(Kelas $kelas): Response
    {
        try {
            $data = [
                'data' => Kelas::with('Siswa')->with('Wali')->with('Mapel')->with('guruMapel')->where('id', $kelas->id)->first(),
                'nilai' => Nilai::where('kelas_id', $kelas->id)->with('siswa')->get(),
            ];

            return Inertia::render('Dashboard/Nilai/Kelas', [
                'data' => $data,
            ]);
        } catch (\Throwable $th) {
            dd($th);
            return Inertia::render('Dashboard/Nilai/Index', [$th->getMessage()]);
        }
    }

    function store(Request $request): RedirectResponse
    {
        try {
            Nilai::create([
                'mapel_id' => $request['mapel_id'],
                'siswa_id' => $request['siswa_id'],
                'guru_id' => $request['guru_id'],
                'kelas_id' => $request['kelas_id'],
                'nilai' => $request['nilai'],
                'semester' => $request['semester'],
                'tahun_ajaran' => $request['tahun_ajaran'],
            ]);

            return redirect()->back()
                ->with('success', 'Nilai Mata Pelajaran Berhasil ditambahkan.');
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return redirect()->back()
                ->with('error', 'Nilai Mata Pelajaran Gagal ditambahkan.');
        }
    }
    function update(Request $request): RedirectResponse
    {
        try {
            $nilai =  Nilai::find($request['nilai_id']);
            $nilai->update([
                'nilai' => $request['nilai'],
            ]);
            return redirect()->back()
                ->with('success', 'Nilai Mata Pelajaran Berhasil di ubah.');
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return redirect()->back()
                ->with('error', 'Nilai Mata Pelajaran Gagal diubah.');
        }
    }
    function nilaiSiswa(): Response
    {
        $user = auth()->user();
        //  NOTE : Siswa Role
        if ($user->role_id == 1) {
            $siswaId =  Siswa::where('user_id', $user->id)->pluck('id');


            $data = [
                'nilai' => Nilai::with('Siswa')->with('Guru')->with('Mapel')->with('Kelas')->whereIn('siswa_id', $siswaId)->get(),
                'kelas' => Nilai::where('siswa_id', $siswaId)->select('kelas_id')->groupBy('kelas_id')->with('Kelas')->get(),
                'siswa' => Siswa::where('user_id', $user->id)->first(),
            ];
            return Inertia::render('Dashboard/Nilai/Siswa', [
                'data' => $data,
            ]);
        }
    }
}
