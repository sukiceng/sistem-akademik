<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PivotGuruKelas extends Model
{
    use HasFactory;

    protected $table = 'guru_kelas';

    protected $fillable = [
        'guru_id',
        'kelas_id',
        'mapel_id'
    ];

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(Guru::class);
    }

    public function kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class);
    }

    public function mapel(): BelongsToMany
    {
        return $this->belongsToMany(Mapel::class);
    }
}
