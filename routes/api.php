<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use \App\Http\Controllers\DoctorsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//группа роутов которые требуют авторизацию
Route::group(['middleware' => 'api'], function () {

    //роуты требующие авторизации
    Route::group(['middleware' => ["check.auth"]], function () {
        Route::controller(AuthController::class)->group(function () {
            Route::post('/me', ['as' => 'me', 'uses' => 'me']);
            Route::post('logout', 'logout');
        });

         Route::controller(UserController::class)->group(function () {
            Route::get("/user", "getAll");
            Route::get("/user/{id}", "getOne");
            Route::post("/user", "create");
            Route::post("/user/update/{id}", "update");
            Route::delete("/user/{id}", "delete");
        });

        //роуты требующие роль админа
        Route::group(['middleware' => ["check.admin"]], function () {
            Route::controller(ServiceController::class)->group(function () {
                Route::post("/service", "create");
                Route::post("/service/update/{id}", "update"); //параша ебаная, ссаный апач не принимает картинки методом PUT, приходится костылить
                Route::delete("/service/{id}", "delete");
            });

            Route::controller(DoctorsController::class)->group(function () {
                Route::post("/doctors", "create");
                Route::get("/doctors", "getAll");
                Route::get("/doctors/{id}", "getOne");
            });
        });
    });
});
Route::controller(DoctorsController::class)->group(function () {
    Route::post("/doctors/update/{id}", "update");
    Route::post("/doctors/me", "me");
    Route::delete("/doctors/{id}", "delete");
});
Route::group(["middleware"=> "doctors"], function (){

});
//роуты не требующие авторизации
Route::group([], function (){
    Route::controller(ServiceController::class)->group(function () {
        Route::get("/service", "getAll");
        Route::get("/service/{id}", "getOne");
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('/login/user', ['as' => 'login', 'uses' => 'login']);
        Route::post("/register/user", "register");
    });

    Route::controller(DoctorsController::class)->group(function () {
        Route::post('/login/doctors', ['as' => 'login', 'uses' => 'login']);
    });
});





