<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class kelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = ['X', 'XI', 'XII', 'Accel'];
        foreach ($role as $key => $value) {
            DB::table('kelas')->insert([
                'nama_kelas' => $value,
                'tahun_ajaran' => rand(2020, 2024),
                'guru_id' => rand(1, 10),
                'created_at' => now(),
            ]);
        };
    }
}
