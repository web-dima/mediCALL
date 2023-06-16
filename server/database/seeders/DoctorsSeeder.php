<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("doctors")->insert(
            [
                [
                    "service_id" => 1,
                    "fio" => "Семонова Виктория Викторовна",
                    "photo" => "/uploads/img/doctors/213b10868e80ce100fd4946b46356af7.jpg",
                    "code" => "semonova",
                    "password" => Hash::make("123"),
                ],
                [
                    "service_id" => 2,
                    "fio" => "Аборин Виктор Николаевич",
                    "photo" => "/uploads/img/doctors/5e853438b56ffa2cd95c9b2d_624ce40cb3ed27.26303310.jpg",
                    "code" => "aborin",
                    "password" => Hash::make("123"),
                ],
[
                    "service_id" => 3,
                    "fio" => "Жмешенко Василий Игоревич",
                    "photo" => "/uploads/img/doctors/a7c2b7f0517e233212d6f2da94002dcc.jpg",
                    "code" => "jmeshenko",
                    "password" => Hash::make("123"),
                ],
            ],
        );
    }
}
