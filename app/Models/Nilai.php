<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Nilai extends Model
{
    use HasFactory;
    protected $fillable = [
        'guru_id',
        'siswa_id',
        'mapel_id',
        'kelas_id',
        'nilai',
        'semester',
        'tahun_ajaran',
    ];

    public function Siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }
    public function Guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }
    public function Mapel(): BelongsTo
    {
        return $this->belongsTo(Mapel::class);
    }
    public function Kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class);
    }
}
