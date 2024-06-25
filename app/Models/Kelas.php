<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_kelas',
        'tahun_ajaran',
        'guru_id'
    ];

    public function wali(): BelongsTo
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class);
    }

    public function guruMapel(): BelongsToMany
    {
        return $this->BelongsToMany(Guru::class);
    }

    public function Mapel(): BelongsToMany
    {
        return $this->BelongsToMany(Mapel::class, 'guru_kelas', 'kelas_id', 'mapel_id');
    }
}
