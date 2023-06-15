<?php

namespace App\Services;

use App\Http\Requests\DoctorsUpdateRequest;
use App\Http\Requests\LoginDoctorRequest;
use App\Models\Doctors;
use App\Models\Services;
use App\Http\Requests\DoctorCreateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PhpParser\Comment\Doc;

class DoctorsService
{
    function login(LoginDoctorRequest $request) {
        $credentials = $request->only(['code', 'password']);
        if (!$token = auth()->guard("doctors")->attempt($credentials)) {
            return response()->json([
                "success" => false,
                "data" =>"неверный логин или пароль"
            ], 200);
        }
        $doctor = Auth::guard("doctors")->user();
        $popi = DB::table("services")->where('id', '=', $doctor["service_id"])->get();
        $doctor["service"] = $popi;
        return response()->json([
            "success" => true,
            "data" =>[
                "user" => $doctor,
                "token"=> [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]
            ]
        ]);
    }

    function me() {
        $doc = Auth::guard("doctors")->user();
        if (!$doc) return response()->json(['status' => 'ошибочный токен'], 401);
        return $doc;
    }

    function create(DoctorCreateRequest $request) {
        try {
            $path = FileService::saveFile($request, "doctors");
            $service = Services::find(intval($request->input("service_id")));
            if (is_null($service)) {
                return response()->json([
                    "success" => false,
                    "data" =>"такого сервиса не существует"
                ]);
            }
            $idService =  $service["id"];
            $doctor = Doctors::create([
                "service_id" => $idService ,
                "fio"=> $request->input("fio"),
                "photo" => $path,
                "code" => $request->input("code"),
                "password" => Hash::make($request->input("password")),
            ]);
            $token = Auth::guard("doctors")->login($doctor);
            return response()->json([
                "success" => true,
                "data" =>[
                    "doctor" => $doctor,
                    "token"=> [
                        'access_token' => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->guard("doctors")->factory()->getTTL() * 60
                    ]
                ]
            ],201);
        }catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "data" =>$e
            ]);
        }
    }

    function update(DoctorsUpdateRequest $req, $id) {
        try {
            $doctor = Doctors::find($id);
            if (is_null($doctor)) {
                return response()->json([
                    "success"=> false,
                    "data"=> "нет такого доктора"
                ]);
            }
            $path = "";
            if ($req->hasFile("img")) {
                FileService::removeFile($doctor["photo"]);
                $path = FileService::saveFile($req, "service");
            }

            $updateFields = [
                "fio" => $req->input("fio") ? $req->input("fio") : $doctor["fio"],
                "photo" => $req->hasFile("img") ? $path : $doctor["photo"],
            ];

            // если понадобиться вернуть обновленый объект
            $updateDoctor = tap($doctor)->update($updateFields);
            return response()->json([
                "success"=> true,
                "data"=> $updateDoctor
            ]);

        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел сволочь виноват однозначно",
                "error" => $e
            ],525);
        }
    }

    function delete($id) {
        try {
            $doctor = Doctors::find($id);
            if (is_null($doctor)) {
                return response()->json([
                    "success"=> false,
                    "data"=> "нет такого доктора"
                ]);
            }

            FileService::removeFile($doctor["photo"]);

            Doctors::destroy($id);
            return response()->json([
                "success"=> true,
                "data"=> "доктор успешно удален"
            ]);
        } catch (\Exception $e) {

            return response()->json([
                "success"=> false,
                'data' => "че то пошло не так, ларавел виноват однозначно",
                "error" => $e
            ],500);
        }
    }

    function getAll() {
        return Doctors::with("services")->get();
    }

    function getOne($id) {
        return Doctors::with("services")->find($id);
    }

    public function getAllReceptionsForDoc(){
        $doc = Auth::guard("doctors")->user();
        if (!$doc) {
            return response()->json([
                "success"=> false,
                'data' => "врач не найден"
            ],404);
        }

        return $doc->receptions()->with(["user"])->get();
    }

    public function getReceptionsByStatus(Request $request){
        $doc = Auth::guard("doctors")->user();
        if (!$doc) {
            return response()->json([
                "success"=> false,
                'data' => "врач не найден"
            ],404);
        }

        return $doc->receptions()->with(["user"])->where("status", "=", $request->status)->get();
    }
}
