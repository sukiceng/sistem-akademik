<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Mapel extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_mata_pelajaran'
    ];
    function Guru(): hasMany
    {
        return $this->hasMany(Guru::class);
    }
    public function Guru_Kelas(): BelongsTo
    {
        return $this->belongsTo(PivotGuruKelas::class);
    }
}
