<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\PivotGuruKelas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Inertia\Inertia;

class KelasMapelController extends Controller
{
    function index(): Response
    {
        // NOTE : Reformat Data
        try {
            return Inertia::render('Dashboard/KelasMapel/KelasMapel', [
                'kelas' => Kelas::with('guruMapel')
                    ->orderBy('tahun_ajaran', 'desc')
                    ->orderBy('nama_kelas')
                    ->get(),
                'mapel' => Mapel::orderBy('nama_mata_pelajaran')->get(),
                'guru'  => Guru::with('Mapel')->orderBy('nama_guru')->get(),
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return Inertia::render('Dashboard/KelasMapel/KelasMapel', [
                'error' => $th->getMessage(),
            ]);
        }
    }
    function edit(Request $request, Kelas $kelas): Response
    {
        // NOTE : Reformat Data
        try {
            return Inertia::render('Dashboard/KelasMapel/UpdateKelas',  [
                'kelas' => Kelas::with('guruMapel')
                    ->orderBy('tahun_ajaran', 'desc')
                    ->orderBy('nama_kelas')
                    ->find($kelas->id),
                'mapel' => Mapel::orderBy('nama_mata_pelajaran')->get(),
                'guru'  => Guru::with('Mapel')->orderBy('nama_guru')->get(),
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return Inertia::render('Dashboard/KelasMapel/UpdateKelas', [
                'error' => $th->getMessage(),
            ]);
        }
    }
    function store(Request $request)
    {
        if ($request['insertFor'] == 'mapel') {
            $this->insertMapel($request);
        } else if ($request['insertFor'] == 'kelas') {
            $this->insertKelas($request);
        }
    }
    function update(Request $request)
    {
        if ($request['insertFor'] == 'mapel') {
            $this->updateMapel($request);
        } else if ($request['insertFor'] == 'kelas') {
            $this->updateKelas($request);
        }
    }

    function insertMapel($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:mapels,nama_mata_pelajaran',
            ], [
                'nama.unique' => 'Mata pelajaran sudah ada',
            ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        }

        Mapel::create([
            'nama_mata_pelajaran' => $request['nama'],
        ]);

        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Berhasil ditambahkan.');
    }
    function updateMapel($request)
    {
        $mapel = Mapel::find($request['id']);
        $mapel->update([
            'nama_mata_pelajaran' => $request['nama'],
        ]);

        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Mata Pelajaran Berhasil diubah.');
    }

    function insertKelas($request)
    {
        try {
            $request->validate([
                'nama' => 'required|unique:kelas,nama_kelas,NULL,id,tahun_ajaran,' . $request['tahun_mulai'] . '/' . $request['tahun_selesai'],
            ], [
                'nama.unique' => 'Kelas sudah ada',
            ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        }

        try {
            DB::beginTransaction();
            $kelas = Kelas::create([
                'nama_kelas' => $request['nama'],
                'guru_id' => $request['wali_guru_id'],
                'tahun_ajaran' => $request['tahun_mulai'] . '/' . $request['tahun_selesai'],
            ]);
            $mapel = $request['mapel_id'];
            foreach ($mapel as $key => $value) {
                $pivot = PivotGuruKelas::create([
                    'mapel_id' => $value,
                    'kelas_id' => $kelas->id,
                    'guru_id' => $request['guru_id'][$key],
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th->getMessage());
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Kelas Gagal ditambahkan.');
            throw $th;
        }
        return redirect()->route('Kelas&Mapel.index')
            ->with('success', 'Kelas Berhasil ditambahkan.');
    }

    function updateKelas($request)
    {
        try {
            DB::beginTransaction();
            $kelas = Kelas::find($request['id']);
            $kelas->update([
                'nama_kelas' => $request['nama'],
                'guru_id' => $request['wali_guru_id'],
                'tahun_ajaran' => $request['tahun_mulai'] . '/' . $request['tahun_selesai'],
            ]);
            $mapel = $request['mapel_id'];
            $pivot = PivotGuruKelas::where('kelas_id', $request['id'])->delete();
            foreach ($mapel as $key => $value) {
                PivotGuruKelas::create([
                    'mapel_id' => $value,
                    'kelas_id' => $request['id'],
                    'guru_id' => $request['guru_id'][$key],
                ]);
            }
            DB::commit();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Kelas Berhasil diubah.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th->getMessage());
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Kelas Gagal diubah.');
            throw $th;
        }
    }

    function destroyMapel($id): RedirectResponse
    {
        try {
            Mapel::find($id)->delete();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Mata Pelajaran Berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Mata Pelajaran Gagal dihapus.');
        }
    }
    function destroyKelas($id): RedirectResponse
    {
        try {
            DB::beginTransaction();

            PivotGuruKelas::where('kelas_id', $id)->delete();

            Kelas::find($id)->delete();
            DB::commit();
            return redirect()->route('Kelas&Mapel.index')
                ->with('success', 'Kelas Berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('Kelas&Mapel.index')
                ->with('error', 'Kelas Gagal dihapus.');
        }
    }
}
