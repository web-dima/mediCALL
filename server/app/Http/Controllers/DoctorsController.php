<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorsUpdateRequest;
use App\Http\Requests\LoginDoctorRequest;
use App\Services\DoctorsService;
use Illuminate\Http\Request;
use App\Http\Requests\DoctorCreateRequest;
use Illuminate\Support\Facades\Log;

class DoctorsController extends Controller
{
    public function __construct(private readonly DoctorsService $DoctorsService)
    {
//        $this->middleware('auth:api', ['except' => []]);
    }

    function create(DoctorCreateRequest $request) {
        return $this->DoctorsService->create($request);
    }

    function getAll() {
        return $this->DoctorsService->getAll();
    }

    function getOne($id) {
        return $this->DoctorsService->getOne($id);
    }
    function login(LoginDoctorRequest $request) {
        return $this->DoctorsService->login($request);
    }

    public function AuthDoctorByAdmin(Request $request){
        return $this->DoctorsService->AuthDoctorByAdmin($request);
    }

    function me() {
        return $this->DoctorsService->me();
    }

    function getAllReceptionsForDoc() {
        return $this->DoctorsService->getAllReceptionsForDoc();
    }

    function getReceptionsByStatus(Request $request) {
        return $this->DoctorsService->getReceptionsByStatus($request);
    }

    function delete($id) {
        return $this->DoctorsService->delete($id);
    }

    function update(DoctorsUpdateRequest $request, $id) {
        echo "sdas";
        return $this->DoctorsService->update($request, $id);
    }
}
