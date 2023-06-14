<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table("users")->insert(
            [
                [
                    "name" => "админ",
                    "email" => "admin@gmail.com",
                    "password" => Hash::make(123),
                    "role" => "admin",
                ],
            ],
        );
    }
}
