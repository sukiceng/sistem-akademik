<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class siswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('siswas')->insert([
                'user_id' => rand(1, 10),
                'nisn' => rand(10000000, 99999999),
                'nama' => fake()->name(),
                'kelas_id' => rand(1, 4),
                'alamat' => fake()->address(),
                'tanggal_lahir' => fake()->date($format = 'd-m-Y', $max = 'now'),
                'created_at' => now(),
            ]);
        };
    }
}
