<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Doctors extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    protected $fillable = ["fio", "photo", "code", "password", "service_id"];
    public $timestamps = false;
    protected $hidden = ["password"];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function Services()
    {
        return $this->belongsTo(Services::class, "service_id");
    }

    public function receptions(): HasMany
    {
        return $this->hasMany(Receptions::class, "doctor_id");
    }
}
