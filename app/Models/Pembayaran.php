<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'tanggal_pembayaran',
        'jumlah_pembayaran',
        'tahun_ajaran',
        'status_pembayaran'
    ];

    public function Siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }
}
