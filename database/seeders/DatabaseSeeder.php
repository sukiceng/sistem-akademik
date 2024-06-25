<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create 10 user
        $this->call(roleSeeder::class);
        $user = User::factory(1)->create();
        // $this->call(mapelSeeder::class);
        // $this->call(guruSeeder::class);
        // $this->call(kelasSeeder::class);
        // $this->call(siswaSeeder::class);
    }
}
