<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receptions extends Model
{
    use HasFactory;
    protected $fillable = ["doctor_id", "date", "result", "user_id", "status"];

    public function doctor()
    {
        return $this->belongsTo(Doctors::class, "doctor_id");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
