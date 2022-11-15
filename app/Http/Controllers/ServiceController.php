<?php

namespace App\Http\Controllers;

use App\Models\Services;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    function getAll()
    {
        return Services::find();

    }
    function getOne(Request $req, $id) {

        if (empty($id)) {
            response()->json([
                "success" => false,
                "err" => "нет такой услуги, ларавел ебаный меня с ума скоро сведет",
            ]);
        }
        $data = Services::find($id);
        if (empty($data)) {
            response()->json([
                "success" => false,
                "err" => "нет такой услуги, ларавел ебаный меня с ума скоро сведет",
            ]);
        }
        return response()->json([
            "success" => true,
            "data" =>$data
        ]);
    }
}
