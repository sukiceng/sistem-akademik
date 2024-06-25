<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = ['siswa', 'guru', 'admin', 'staff'];
        foreach ($role as $key => $value) {
            DB::table('roles')->insert([
                'jenis_role' => $value,
                'updated_at' => now(),
                'created_at' => now()
            ]);
        };
    }
}
