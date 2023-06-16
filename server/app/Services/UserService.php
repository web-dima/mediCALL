<?php

namespace App\Services;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    static function gatAll() {
        User::all();
    }
    static function getOne($id) {
        $data = User::find($id);

        if (is_null($data)) {
            return response()->json([
                "success" => false,
                "err" => "нет такого пользователя, ларавел ебаный меня с ума скоро сведет",
            ]);
        }
        return response()->json([
            "success" => true,
            "data" =>$data
        ]);
    }

    static function findByEmail($email) {

    }
    static function create(CreateUserRequest $request) {
//        try {
//
//            $user = User::create([
//                'name' => $request["name"],
//                'after_GP' => filter_var($request["after_GP"], FILTER_VALIDATE_BOOLEAN),
//                'img' => "$path"
//            ]);
//
//            return response()->json([
//                'success' => true,
//                "data"=> $user
//            ]);
//        } catch (\Exception $e) {
//
//            return response()->json([
//                "success"=> false,
//                'data' => $e
//            ],500);
//        }
    }
    static function update(UpdateUserRequest $request, $id) {
//        try {
//            $service = User::find($id);
//            if (is_null($service)) {
//                return response()->json([
//                    "success"=> false,
//                    "data"=> "нет такого сервиса"
//                ]);
//            }
//
//            $updateFields = [
//                "name" => $req->input("name") ? $req->input("name") : $service["name"],
//                "after_GP" => $req->input("after_GP") ? filter_var($req->input("after_GP"), FILTER_VALIDATE_BOOLEAN) : $service["after_GP"],
//                "img" => $req->hasFile("img") ? $path : $service["img"],
//            ];
//
//            // если понадобиться вернуть обновленый объект
//            $updateService = tap($service)->update($updateFields);
//            return response()->json([
//                "success"=> true,
//                "data"=> $updateService
//            ]);
//
////            return response()->json([
////                "success"=> true,
////                "data"=> $service->update($updateFields)
////            ]);
//
//        } catch (\Exception $e) {
//
//            return response()->json([
//                "success"=> false,
//                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
//                "error" => $e
//            ],500);
//        }
    }
    static function delete($id) {
        try {
            $user = User::find($id);
            if (is_null($user)) {
                return response()->json([
                    "success" => false,
                    "err" => "нет такого пользователя, ларавел ебаный меня с ума скоро сведет",
                ]);
            }

            User::destroy($id);
            return response()->json([
                "success"=> true,
                "data"=> "пользователь успешно удален"
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],500);
        }
    }

    public function popa(){
        $user = Auth::user();
        $receptions = $user->receptions()->with("doctor.services")->where("status", "=", "завершен")->get();
        $canMakeReception = false;
        foreach ($receptions as $reception) {
            if ($reception["doctor"]["services"]["name"] == "Терапевт") {
                $canMakeReception = true;
            }
        }
        return response()->json([
            "status"=> $canMakeReception,
        ]);
    }
}
