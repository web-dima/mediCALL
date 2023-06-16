<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
public function __construct(protected UserService $userService){}

    public function gatAll() {

    }
    public function getOne($id) {

    }
    public function create(CreateUserRequest $request) {

    }
    public function update(UpdateUserRequest $request, $id) {

    }
    public function delete($id) {

    }
    public function popa(){
        return $this->userService->popa();
    }
}
