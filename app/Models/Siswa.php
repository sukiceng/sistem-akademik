<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Siswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nisn',
        'nama',
        'kelas_id',
        'alamat',
        'tanggal_lahir',
        'user_id'
    ];


    public function Nilai(): HasMany
    {
        return $this->HasMany(Nilai::class);
    }


    public function Account(): HasOne
    {
        return $this->hasOne(User::class);
    }
    public function Kelas(): HasMany
    {
        return $this->HasMany(Kelas::class);
    }
    public function RiwayatKelas(): HasMany
    {
        return $this->HasMany(RiwayatKelas::class);
    }


    public function Pembayaran(): HasMany
    {
        return $this->HasMany(Pembayaran::class);
    }
}
