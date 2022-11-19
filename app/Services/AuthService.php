<?php

namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    static function register(RegisterRequest $request) {
        try {
            $user = User::create([
                "name" => $request->input("name"),
                "email" => $request->input("email"),
                "password" => Hash::make($request->input("password")),
            ]);
            return response()->json([
                "success" => true,
                "data" =>$user
            ]);
        }catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "data" =>$e
            ]);
        }

    }
    static function login() {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
}
