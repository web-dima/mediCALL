<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

Route::controller(ServiceController::class)->group(function () {
    Route::get("/service", "getAll");
    Route::get("/service/{id}", "getOne");
    Route::post("/service", "create");
    Route::post("/service/update/{id}", "update"); //параша ебаная, ссаный апач не принимает картинки методом PUT, приходится костылить
    Route::delete("/service/{id}", "delete");
});

Route::controller(AuthController::class)->group(function () {
    Route::post("/register/user", "register");
    Route::post("/login/user", "login");
});

Route::controller(UserController::class)->group(function () {
    Route::get("/user", "getAll");
    Route::get("/user/{id}", "getOne");
    Route::post("/user", "create");
    Route::post("/user/update/{id}", "update");
    Route::delete("/user/{id}", "delete");
});


