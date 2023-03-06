<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
                    "fio" => "Белгородов Шэхо Кибивович",
                    "photo" => "C0FvTP0TmmnmLeI3s8m16dVOch7MWQN8.png",
                    "code" => "kibi",
                    "password" => "123",
                ],
                [
                    "service_id" => 2,
                    "fio" => "Сосов Ноль Юанович",
                    "photo" => "C0FvTP0TmmnmLeI3s8m16dVOch7MWQN8.png",
                    "code" => "cinga",
                    "password" => "123",
                ],
                [
                    "service_id" => 3,
                    "fio" => "Самогонов Халера Трупович",
                    "photo" => "C0FvTP0TmmnmLeI3s8m16dVOch7MWQN8.png",
                    "code" => "senoval",
                    "password" => "123",
                ],
            ],
        );
    }
}
