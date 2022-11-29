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
                    "img" => "img/GP.png",
                ],
                [
                    "name" => "Уролог",
                    "after_GP" => true,
                    "img" => "img/ur.png",
                ],
                [
                    "name" => "Нарколог",
                    "after_GP" => true,
                    "img" => "img/drugs.png",
                ],
                [
                    "name" => "Невролог",
                    "after_GP" => true,
                    "img" => "img/nevrol.png",
                ],
                [
                    "name" => "Психолог",
                    "after_GP" => true,
                    "img" => "img/shiz.png",
                ],
            ],
        );
    }
}
