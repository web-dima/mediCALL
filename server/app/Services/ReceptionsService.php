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

        return Receptions::with(["user", "doctor.services"])->where("user_id", $user["id"])->get();
    }

    public function getOne($id){
        return Receptions::with(["user", "doctor.services"])->find($id);
    }

    public function create(CreateReceptionRequest $request){
         try {
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    "data"=> "только клиент может создавать заявку"
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
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => $e
            ],500);
        }
    }

    private function changeStatus($status, $id) {
        if ($status === "принят") {
            return response()->json([
                "success"=> false,
                'data' => "нельзя выписать статус 'принят', повторно"
            ],400);
        } else {
            $recep = Receptions::findOrFail($id);
            $recep->status = $status;
            if ($recep->save()) {
                return response()->json([
                    "success"=> true,
                    'data' => "успешно выписан статус '$status'"
                ]);
            } else {
                return response()->json([
                    "success"=> false,
                    'data' => "ошибка при выписывании статуса '$status'"
                ]);
            }
        }
    }

    public function changeStatusReq(ChangeReceptionStatusRequest $request){
        return $this->changeStatus($request["status"], $request["id"]);
        //        switch ($status) {
//            case "принят" : {
//                return response()->json([
//                    "success"=> false,
//                    'data' => "нельзя выписать статус 'принят', повторно"
//                ],400);
//            }
//            case "активен" : {
//                $recep = Receptions::findOrFail($request["id"]);
//                $recep->status = $status;
//                if ($recep->save()) {
//                    return response()->json([
//                        "success"=> true,
//                        'data' => "успешно выписан статус $status"
//                    ]);
//                } else {
//                    return response()->json([
//                        "success"=> false,
//                        'data' => "ошибка при выписывании статуса $status"
//                    ]);
//                }
//            }
//            case "завершен" : {
//                $reception = Receptions::findOrFail($request["id"]);
//                $reception->status = $status;
//                if ($reception->save()) {
//                    return response()->json([
//                        "success"=> true,
//                        'data' => "успешно выписан статус $status"
//                    ]);
//                } else {
//                    return response()->json([
//                        "success"=> false,
//                        'data' => "ошибка при выписывании статуса $status"
//                    ]);
//                }
//            }
//            case "отменен" : {
//                $receptionnm = Receptions::findOrFail($request["id"]);
//                $receptionnm->status = $status;
//                if ($receptionnm->save()) {
//                    return response()->json([
//                        "success"=> true,
//                        'data' => "успешно выписан статус $status"
//                    ]);
//                } else {
//                    return response()->json([
//                        "success"=> false,
//                        'data' => "ошибка при выписывании статуса $status"
//                    ]);
//                }
//            }
//            default : {
//                return response()->json([
//                    "success"=> false,
//                    'data' => "невозможно выписать такой статус"
//                ],400);
//            }
//        }
    }

    public function accept($id) {
        return $this->changeStatus("активен", $id);
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
            'data' => ""
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
                "data"=> "прием успешно удален"
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],500);
        }
    }

}
