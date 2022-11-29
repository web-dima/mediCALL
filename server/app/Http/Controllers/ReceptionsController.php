<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeReceptionStatusRequest;
use App\Http\Requests\CompleteReceptionRequest;
use App\Http\Requests\CreateReceptionRequest;
use App\Models\Receptions;
use App\Services\ReceptionsService;
use Illuminate\Http\Request;

class ReceptionsController extends Controller
{
    public function __construct(private readonly ReceptionsService $ReceptionsService){}

    public function getAll() {
        return $this->ReceptionsService->getAll();
    }

    public function getAllForUser() {
        return $this->ReceptionsService->getAllForUser();
    }

    public function getOne($id){
        return $this->ReceptionsService->getOne($id);
    }

    public function create(CreateReceptionRequest $request){
        return $this->ReceptionsService->create($request);
    }

    public function delete($id){
        return $this->ReceptionsService->delete($id);
    }

    public function changeStatus(ChangeReceptionStatusRequest $request){
        return $this->ReceptionsService->changeStatusReq($request);
    }

    public function accept($id){
        return $this->ReceptionsService->accept($id);
    }

    public function cancel($id){
        return $this->ReceptionsService->cancel($id);
    }

    public function complete(CompleteReceptionRequest $request){
        return $this->ReceptionsService->complete($request);
    }

}
