<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RiwayatKelas extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_siswa',
        'id_kelas',
        'tanggal_masuk',
        'tanggal_keluar',
        'keterangan'
    ];

    public function Siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }
}
