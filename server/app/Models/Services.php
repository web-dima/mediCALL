<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'services';
    protected $fillable = ["name","after_GP", "img"];

//    public function doctors()
//    {
//        return $this->belongsTo(Doctors::class);
//    }

}
