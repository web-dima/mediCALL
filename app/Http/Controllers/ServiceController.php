<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceCreateRequest;
use App\Http\Requests\ServiceUpdateRequest;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{

    public function __construct(private readonly ServiceService $ServiceService) {
//        $this->middleware(["check.auth","check.admin"], ['except' => ['getAll', "getOne"]]);
    }


    function getAll(){
        return $this->ServiceService->getAll();
    }
    function getOne($id) {
        return $this->ServiceService->getOne($id);
    }
    function create(ServiceCreateRequest $request) {
        return $this->ServiceService->create($request);
    }

    function delete($id) {
        return $this->ServiceService->delete($id);
    }

    function update(ServiceUpdateRequest $req, $id) {
        return $this->ServiceService->update($req,$id);
    }

}
