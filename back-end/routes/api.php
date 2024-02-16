<?php

use App\Http\Controllers\Api\ItensController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/user', UserController::class);
    Route::apiResource('/itens', ItensController::class);
    Route::apiResource('/table', TableController::class);
    Route::apiResource('/menu', MenuController::class);
    Route::get('/itensa', [ItensController::class, 'indexAll']);
    Route::get('/itenss/{slug}', [ItensController::class, 'showSlug']);
    Route::get('/menu/{cpf}', [MenuController::class, 'showCPF']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
