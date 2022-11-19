<?php
namespace App\Services;

use App\Http\Requests\ServiceCreateRequest;
use App\Http\Requests\ServiceUpdateRequest;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceService {
    static function getAll() {
        return Services::all();
    }

    static function getOne($id) {
        $data = Services::find($id);

        if (is_null($data)) {
            return response()->json([
                "success" => false,
                "err" => "нет такой услуги, ларавел ебаный меня с ума скоро сведет",
            ]);
        }
        return response()->json([
            "success" => true,
            "data" =>$data
        ]);
    }

    static function create(ServiceCreateRequest $request){
        try {
            $path = FileService::saveFile($request, "service");

            $s = Services::create([
                'name' => $request["name"],
                'after_GP' => filter_var($request["after_GP"], FILTER_VALIDATE_BOOLEAN),
                'img' => "$path"
            ]);
            var_dump($s);
            return response()->json([
                'success' => true,
                "data"=> $s
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => $e
            ],500);
        }
    }

    static function update(ServiceUpdateRequest $req, $id) {
        try {
            $service = Services::find($id);
            if (is_null($service)) {
                return response()->json([
                    "success"=> false,
                    "data"=> "нет такого сервиса"
                ]);
            }
            $path = "";
            if ($req->hasFile("img")) {
                FileService::removeFile($service["img"]);
                $path = FileService::saveFile($req, "service");
            }

            $updateFields = [
                "name" => $req->input("name") ? $req->input("name") : $service["name"],
                "after_GP" => $req->input("after_GP") ? filter_var($req->input("after_GP"), FILTER_VALIDATE_BOOLEAN) : $service["after_GP"],
                "img" => $req->hasFile("img") ? $path : $service["img"],
            ];

            // если понадобиться вернуть обновленый объект
            $updateService = tap($service)->update($updateFields);
            return response()->json([
                "success"=> true,
                "data"=> $updateService
            ]);

//            return response()->json([
//                "success"=> true,
//                "data"=> $service->update($updateFields)
//            ]);

        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],500);
        }

    }

    static function delete($id){
        try {
            $service = Services::find($id);
            if (is_null($service)) {
                return response()->json([
                    "success"=> false,
                    "data"=> "нет такого сервиса"
                ]);
            }

            FileService::removeFile($service["img"]);

            Services::destroy($id);
            return response()->json([
                "success"=> true,
                "data"=> "серсис успешно удален"
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
