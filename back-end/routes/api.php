<?php

use App\Http\Controllers\Api\ItensController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\MesaController;
use App\Http\Controllers\Api\OrderController;
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
    // Login
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        // Table
        Route::apiResource('/table', MesaController::class);
        // Menu
        Route::apiResource('/menu', MenuController::class);
        Route::get('/menucpf/{cpf}', [MenuController::class, 'showCPF']);
        Route::get('/menuCodigo/{codigo}', [MenuController::class, 'showCodigo']);
        // Order
        Route::apiResource('/order', OrderController::class);
    });
    // Itens
    Route::apiResource('/itens', ItensController::class);
    Route::get('/itensa', [ItensController::class, 'indexAll']);
    Route::get('/itenss/{slug}', [ItensController::class, 'showSlug']);
    // User
    Route::apiResource('/user', UserController::class);
    Route::get('/userShow', [UserController::class, 'show']);
    Route::put('/userUpdate', [UserController::class, 'update']);
    Route::get('/userDelete', [UserController::class, 'destroy']);
    Route::post('/reSendEmail', [UserController::class, 'reSendEmail']);
    Route::get('/verifyEmail/{email}', [UserController::class, 'verifyEmail']);
    Route::post('/sendTokenRecover', [UserController::class, 'sendTokenRecover']);
    Route::post('/verifyTokenRecover', [UserController::class, 'verifyTokenRecover']);
    Route::put('/updatePassword/{token}', [UserController::class, 'updatePassword']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
