<?php

namespace App\Services;

use App\Models\Doctors;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PhpParser\Comment\Doc;

class DoctorsService
{
    function login() {
        try {
            $doctor = Doctors::create([
                "fio"=> "godo",
                "photo" => "string",
                "code" => "123",
                "password" => Hash::make("123"),
            ]);
//            if (!$token = auth()->attempt([
//                "email"=> $request->input("email"),
//                "password"=> $request->input("password"),
//            ])) {
//                return response()->json([
//                    "success" => false,
//                    "data" =>"неверный логин или пароль"
//                ]);
//            }
            $token = Auth::guard("doctors")->login($doctor);
            echo $token;
            return response()->json([
                "success" => true,
                "data" =>[
                    "doctor" => $doctor,
                    "token"=> [
                        'access_token' => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60
                    ]
                ]
            ]);
        }catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "data" =>$e
            ]);
        }
    }

    function me() {
        return Auth::guard("doctors")->user();
    }

    function create(Request $request) {
        return "some";
    }

    function update(Request $request) {
    }

    function delete(Request $request) {
    }

    function getAll(Request $request) {
    }

    function getOne(Request $request) {
    }
}
