<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nilais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mapel_id')->constrained('mapels');
            $table->foreignId('siswa_id')->constrained('siswas');
            $table->foreignId('guru_id')->constrained('gurus');
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->string('nilai')->nullable();
            $table->string('semester')->nullable();
            $table->string('tahun_ajaran')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilais');
    }
};
