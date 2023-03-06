<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("services")->insert(
            [
                [
                    "name" => "Терапевт",
                    "after_GP" => false,
                    "img" => "public\uploads\img\service\GP.jpg",
                ],
                [
                    "name" => "Уролог",
                    "after_GP" => true,
                    "img" => "public\uploads\img\service\ur.jpg",
                ],
                [
                    "name" => "Нарколог",
                    "after_GP" => true,
                    "img" => "public\uploads\img\service\drugs.jpg",
                ],
                [
                    "name" => "Невролог",
                    "after_GP" => true,
                    "img" => "public\uploads\img\service\\nevrol.jpg",
                ],
                [
                    "name" => "Психолог",
                    "after_GP" => true,
                    "img" => "public\uploads\img\service\shiz.jpg",
                ],
            ],
        );
    }
}
