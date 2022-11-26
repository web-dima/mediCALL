<?php

namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    function register(RegisterRequest $request) {
        try {
            $user = User::create([
                "name" => $request->input("name"),
                "email" => $request->input("email"),
                "password" => Hash::make($request->input("password")),
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
            $token = Auth::login($user);
            return response()->json([
                "success" => true,
                "data" =>[
                    "user" => $user,
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
    function login() {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                "success" => false,
                "data" =>"неверный логин или пароль"
            ], 525);
        }

//        return response()->json([
//            'access_token' => $token,
//            'token_type' => 'bearer',
//            'expires_in' => auth()->factory()->getTTL() * 60
//        ]);
        $user = Auth::user();
        return response()->json([
            "success" => true,
            "data" =>[
                "user" => $user,
                "token"=> [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]
            ]
        ]);
    }

    public function me() {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
