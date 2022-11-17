<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceStoreRequest;
use App\Http\Requests\UpdateService;
use App\Models\Services;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    function getAll(){
        return ServiceService::getAll();
    }
    function getOne($id) {
        return ServiceService::getOne($id);
    }
    function create(Request $request) {
        return ServiceService::create($request);
    }

    function store(ServiceStoreRequest $request) {
        return ServiceService::store($request);
    }

    function delete($id) {
        return ServiceService::delete($id);
    }

    function update(UpdateService $req, $id) {
        return ServiceService::update($req,$id);
    }

}
