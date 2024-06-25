<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_admin',
        'email',
    ];

    public function Account(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
}
