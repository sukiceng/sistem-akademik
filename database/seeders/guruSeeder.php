<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class guruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i = 0; $i < 10; $i++) {
            DB::table('gurus')->insert([
                'nama_guru' => fake()->name(),
                'alamat' => fake()->address(),
                'tanggal_lahir' => fake()->date($format = 'd-m-Y', $max = 'now'),
                'nip' => rand(10000000, 99999999),
                'mapel_id' => rand(1, 10),
                'user_id' => rand(1, 10),
                'created_at' => now(),
            ]);
        };
    }
}
