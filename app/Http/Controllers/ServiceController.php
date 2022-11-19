<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceCreateRequest;
use App\Http\Requests\ServiceUpdateRequest;
use App\Services\ServiceService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    function getAll(){
        return ServiceService::getAll();
    }
    function getOne($id) {
        return ServiceService::getOne($id);
    }
    function create(ServiceCreateRequest $request) {
        return ServiceService::create($request);
    }

    function delete($id) {
        return ServiceService::delete($id);
    }

    function update(ServiceUpdateRequest $req, $id) {
        return ServiceService::update($req,$id);
    }

}
