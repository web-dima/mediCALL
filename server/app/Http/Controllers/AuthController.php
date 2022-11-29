<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $AuthService)
    {
//        $this->middleware('auth:api', ['except' => ['login', "register", "me", "logout"]]);
    }

    function register(RegisterRequest $request) {
        return $this->AuthService->register($request);
    }
    function login(LoginRequest $loginRequest) {
        return $this->AuthService->login();
    }
    public function me(){
        return $this->AuthService->me();
    }

    public function logout(){
        return $this->AuthService->logout();
    }
}
