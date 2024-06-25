<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    function index(): Response
    {
        try {
            $data = [];
            $users = User::with('role:id,jenis_role')->get();
            foreach ($users as $item) {
                $data[] = [
                    'id' => $item->id,
                    'username' => $item->username,
                    'email' => $item->email,
                    'role' => $item->role->jenis_role,
                    'join_date' => $item->created_at->format('j F, Y')
                ];
            }
            return Inertia::render('Dashboard/User/User', [
                'users' => $data,
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }
    function create(): Response
    {

        try {
            return Inertia::render('Dashboard/User/AddUser', [
                'kelas' => Kelas::all(),
                'mapel' => Mapel::all(),
            ]);
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }
    function Edit(user $user): Response
    {
        try {
            $user = User::with('role:id,jenis_role')->findorFail($user->id);
            if ($user->role->jenis_role == 'siswa') {
                $user->detailUser = $user->Siswa;
            } else if ($user->role->jenis_role == 'guru') {
                $user->guru = $user->Guru;
            }
            // else if ($user->role->jenis_role == 'admin') {
            //     $user->detailUser = Admin::with('Account')->where('user_id', $user->id)->first();
            // }
            $data = [
                'user' => $user,
                'kelas' => Kelas::all(),
                'mapel' => Mapel::all(),
            ];
            return Inertia::render('Dashboard/User/UpdateUser', [
                'data' => $data
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }

    function store(Request $request): RedirectResponse
    {
        try {
            $rule = [
                'nama' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'role_id' => 'required|exists:roles,id',
                'password' => 'required|string|min:8|same:confirm',
            ];
            // NOTE : Siswa
            if ($request->role_id == 1) {
                $rule['nisn'] = 'required|unique:siswas,nisn';
                $rule['kelas_id'] = 'required|exists:kelas,id';
                $rule['tanggal_lahir'] = 'required';
            }
            // NOTE : Guru
            if ($request->role_id == 2) {
                $rule['nip'] = 'required|unique:gurus,nip';
                $rule['mapel_id'] = 'required|exists:mapels,id';
                $rule['tanggal_lahir'] = 'required';
            }
            // NOTE : Default Admin

            $request->validate($rule);
            DB::beginTransaction();
            $user = User::create([
                'username' => $request->nama,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => $request->role_id,
            ]);
            // NOTE : add siswa data
            if ($request->role_id == 1  && !is_null($user)) {
                $siswa = Siswa::create([
                    'user_id' => $user->id,
                    'nama' => $request->nama,
                    'nisn' => $request->nisn,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'kelas_id' => intval($request->kelas_id),
                ]);
                if (is_null($siswa)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            // NOTE : add guru data
            if ($request->role_id == 2  && !is_null($user)) {
                $guru = Guru::create([
                    'user_id' => $user->id,
                    'nama_guru' => $request->nama,
                    'nip' => $request->nip,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'mapel_id' => intval($request->mapel_id),
                ]);
                if (is_null($guru)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            // NOTE : add admin data
            if ($request->role_id == 3  && !is_null($user)) {
                $admin = Admin::create([
                    'user_id' => $user->id,
                    'nama_admin' => $request->nama,
                ]);
                if (is_null($admin)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            DB::commit();

            return back()->with('success', 'User Save successfully');
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator->errors())->withInput();
        } catch (\Throwable $th) {
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            if ($user->role->jenis_role == 'siswa') {
                Siswa::where('user_id', $user->id)->delete();
            } elseif ($user->role->jenis_role == 'guru') {
                Guru::where('user_id', $user->id)->delete();
            } elseif ($user->role->jenis_role == 'admin') {
                Admin::where('user_id', $user->id)->delete();
            }
            $user->delete();
            DB::commit();
            return back()->with('success', 'User Delete successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([$th->getMessage()]);
        }
    }
    public function update(Request $request, User $user): RedirectResponse
    {
        // NOTE : Reformat Data
        try {
            $idUser = $user->id;
            $rule = [
                'nama' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $idUser,
                'role_id' => 'required|exists:roles,id',
            ];
            if ($request->password) {
                $rule['password'] = 'required|string|min:8|same:confirm';
            }
            // NOTE : Siswa
            if ($request->role_id == 1) {
                $rule['nisn'] = 'required|unique:siswas,nisn,' . $idUser . ',user_id';
                $rule['kelas_id'] = 'required|exists:kelas,id';
                $rule['tanggal_lahir'] = 'required';
            }
            // NOTE : Guru
            if ($request->role_id == 2) {
                // dd($request->nip);
                $rule['nip'] = ['required', 'unique:gurus,nip,' . $idUser . ',user_id'];
                $rule['mapel_id'] = 'required|exists:mapels,id';
                $rule['tanggal_lahir'] = 'required';
            }
            // NOTE : Default Admin
            $request->validate($rule);
            DB::beginTransaction();
            $data = [];
            if ($request->password) {
                $data['password'] = bcrypt($request->password);
            }
            $data['username'] = $request->nama;
            $data['email'] = $request->email;

            $user->update($data);
            // NOTE : add siswa data
            if ($request->role_id == 1  && !is_null($user)) {
                $siswa = Siswa::where('user_id', $user->id)->first();
                $siswa->update([
                    'user_id' => $user->id,
                    'nama' => $request->nama,
                    'nisn' => $request->nisn,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'kelas_id' => intval($request->kelas_id),
                ]);
                if (is_null($siswa)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            // NOTE : add guru data
            if ($request->role_id == 2  && !is_null($user)) {
                $guru = Guru::where('user_id', $user->id)->first();

                $guru->update([
                    'user_id' => $user->id,
                    'nama_guru' => $request->nama,
                    'nip' => $request->nip,
                    'alamat' => $request->alamat,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'mapel_id' => intval($request->mapel_id),
                ]);
                if (is_null($guru)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            // NOTE : add admin data
            if ($request->role_id == 3  && !is_null($user)) {
                $admin = Admin::where('user_id', $user->id)->first();
                $admin->update([
                    'user_id' => $user->id,
                    'nama_admin' => $request->nama,
                ]);
                if (is_null($admin)) {
                    $user->delete();
                    DB::rollBack();
                }
            }
            DB::commit();

            return back()->with('success', 'User Berhasil Diupdate');
        } catch (ValidationException $e) {
            dd($e->validator->errors());
            return back()->withErrors($e->validator->errors())->withInput();
        } catch (\Throwable $th) {
            dd($th->getMessage());
            return back()->withErrors([$th->getMessage()])->withInput();
        }
    }
}
