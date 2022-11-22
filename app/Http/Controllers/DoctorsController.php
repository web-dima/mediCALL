<?php

namespace App\Http\Controllers;

use App\Services\DoctorsService;
use Illuminate\Http\Request;

class DoctorsController extends Controller
{
    public function __construct(private readonly DoctorsService $DoctorsService)
    {
//        $this->middleware('auth:api', ['except' => []]);
    }

    function create(Request $request) {
        return $this->DoctorsService->create($request);
    }

    function getAll() {
        return $this->DoctorsService->getAll($request);
    }

    function getOne() {
        return $this->DoctorsService->getOne($request);
    }

    function login() {
        return $this->DoctorsService->login();
    }

    function me() {
        return $this->DoctorsService->me();
    }

    function delete() {
        return $this->DoctorsService->delete($request);
    }

    function update() {
        return $this->DoctorsService->update($request);
    }
}
