<?php

namespace App\Services;

use App\Http\Requests\AcceptReceptionRequest;
use App\Http\Requests\CompleteReceptionRequest;
use App\Models\Receptions;
use \App\Http\Requests\CreateReceptionRequest;
use Illuminate\Support\Facades\Auth;
use \App\Http\Requests\ChangeReceptionStatusRequest;

class ReceptionsService
{
    public function getAll() {
        return Receptions::with(["user", "doctor.services"])->get();
    }

    public function getAllForUser() {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                "data"=> "только клиент может смотреть свои заявки"
            ]);
        }

        return Receptions::with(["user", "doctor.services"])
            ->where("status","<>", "отменен")
//            ->where("status","<>", "завершен")
            ->where("user_id", $user["id"])
            ->get();
    }

    public function getOne($id){
        return Receptions::with(["user", "doctor.services"])->find($id);
    }

    public function create(CreateReceptionRequest $request){
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                "data"=> "только клиент может создавать заявку"
            ]);
        }
        $userHaveSameReception = $user->receptions()
            ->where("date", "=", $request["date"])
            ->where("doctor_id", "=", $request["doctor_id"])
            ->where("status", "<>", "завершен")
            ->first();
//        return $userHaveSameReception;
        if ($userHaveSameReception) {
            return response()->json([
                'success' => false,
                "data"=> "вы не можете записаться к одному врачу 2 раза в одну дату, можно записаться либо в другую дату, либо после завершения приема"
            ]);
        }
        $receptions = Receptions::create([
            'user_id' => $user["id"],
            'doctor_id' => $request["doctor_id"],
            'date' =>$request["date"]
        ]);
        return response()->json([
            'success' => true,
            "data"=> $receptions
        ]);
    }

    private function changeStatus($status, $id) {
        $recep = Receptions::findOrFail($id);
        $recep->status = $status;
        if ($recep->save()) {
            return response()->json([
                "success"=> true,
                'data' => $status
            ]);
        } else {
            return response()->json([
                "success"=> false,
                'data' => $status
            ]);
        }
    }

    public function changeStatusReq(ChangeReceptionStatusRequest $request){
        return $this->changeStatus($request["status"], $request["id"]);
    }

    public function accept($id) {
        return $this->changeStatus("принят", $id);
    }

    public function cancel($id) {
        return $this->changeStatus("отменен", $id);
    }

    public function complete(CompleteReceptionRequest $request) {
        $reception = Receptions::findOrFail($request["id"]);
        $reception->result = $request["result"];
        $reception->save();
        $this->changeStatus("завершен", $reception["id"]);

        return response()->json([
            "success"=> true,
            'data' => [
                "status"=> "завершен",
                "result"=>$reception->result
            ]
        ]);
    }

    public function delete($id) {
        try {
            $reception = Receptions::find($id);
            if (is_null($reception)) {
                return response()->json([
                    "success"=> false,
                    "data"=> "нет такого приема"
                ]);
            }

            Receptions::destroy($id);
            return response()->json([
                "success"=> true,
                "data"=> $id
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],500);
        }
    }

    public function backToActive($id){
        return $this->changeStatus("активен", $id);
    }

}
