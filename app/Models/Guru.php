<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guru extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'nama_guru',
        'alamat',
        'tanggal_lahir',
        'mapel_id',
        'user_id'
    ];
    public function Account(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function WaliKelas(): HasMany
    {
        return $this->hasMany(Kelas::class, 'guru_id', 'id');
    }

    public function Kelas(): BelongsToMany
    {
        return $this->belongsToMany(Kelas::class, 'guru_kelas', 'guru_id', 'kelas_id')
            ->withPivot('mapel_id');
    }
    public function Mapel(): BelongsTo
    {
        return $this->BelongsTo(Mapel::class);
    }
    public function PivotGuruKelas(): BelongsTo
    {
        return $this->belongsTo(PivotGuruKelas::class);
    }
}
