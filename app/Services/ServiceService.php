<?php
namespace App\Services;

use App\Http\Requests\ServiceStoreRequest;
use App\Http\Requests\UpdateService;
use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceService {
    static function getAll() {
        return Services::all();
    }

    static function getOne(Request $req, $id) {
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

    static function create(Request $request) {
        if(!$request->hasFile('img')) {
            return response()->json(['upload_file_not_found'], 400);
        }
        $file = $request->file('img');
        if(!$file->isValid()) {
            return response()->json(['invalid_file_upload'], 400);
        }
        $path = public_path() . '/uploads/img/service/';
        $file->move($path, $file->getClientOriginalName());
//        $request->validate([
//            "name"=> "required",
//            "after_GP"=> "required"
//        ]);
        $response = array('data' => '', 'success'=>false);
        $validator = Validator::make($request->all(), [
            "name"=> "required",
            "after_GP"=> "required"
        ]);

        if ($validator->fails()) {
            $response['data'] = $validator->messages();
            return $response;
        } else {
            $request["after_GP"] = filter_var($request["after_GP"], FILTER_VALIDATE_BOOLEAN);
//            $newService = new Services;
            $newService =  Services::create([
                "name" => $request["name"],
                "after_GP" => $request["after_GP"],
                "img" => $path,
            ]);
            return response()->json([
                "success" => true,
                "data" =>$newService
            ]);
//            return $newService;
//            return $request->all();

        }
//        return response()->json(compact('path'));
    }

    static function store(ServiceStoreRequest $request){
        try {
            $imageName = Str::random(32).".".$request->file("img")->getClientOriginalExtension();

            // Create Service
            $s = Services::create([
                'name' => $request["name"],
                'after_GP' => filter_var($request["after_GP"], FILTER_VALIDATE_BOOLEAN),
                'img' => $imageName
            ]);
            $path = public_path() . '/uploads/img/service/';
            $file = $request->file("img");
            $file->move($path, $imageName);

            return response()->json([
                'status' => true,
                "data"=> $s
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "status"=> false,
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    static function delete($id){
        try {

        } catch (\Exception $e) {

            return response()->json([
                "status"=> false,
                'message' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],500);
        }
    }

    static function update(UpdateService $req, $id) {

        return [$req->all(), $id];
    }
}
