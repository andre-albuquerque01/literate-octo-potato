<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ItensController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\MesaController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\RateController;
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

Route::prefix('v2')->group(function () {
    // Login
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        // Table check
        Route::apiResource('/table', MesaController::class);
        // Menu
        Route::apiResource('/menu', MenuController::class);
        Route::get('/menuAll', [MenuController::class, 'showAll']);
        Route::get('/menuA', [MenuController::class, 'showAllOpenAndClose']);
        Route::get('/menuUser', [MenuController::class, 'showUser']);
        Route::get('/menuHistoric', [MenuController::class, 'showHistoric']);
        Route::get('/menucpf/{cpf}', [MenuController::class, 'showCPF']);
        Route::get('/menucpfOpen/{cpf}', [MenuController::class, 'showCPFOpen']);
        Route::get('/menuCodigo/{codigo}', [MenuController::class, 'showCodigo']);
        // Order check
        Route::get('/ordersa/{id}', [OrderController::class, 'getMenuOrder']);
        Route::get('/orderMenu/{id}', [OrderController::class, 'showMenuUser']);
        Route::apiResource('/order', OrderController::class);
    });
    // Itens check
    Route::apiResource('/itens', ItensController::class);
    Route::get('/itensa', [ItensController::class, 'indexAll']);
    Route::get('/itensInitial', [ItensController::class, 'indexInitial']);
    Route::get('/itenst/{title}', [ItensController::class, 'showTitle']);
    Route::get('/itensc/{typeCategory}', [ItensController::class, 'showCategory']);

    // User check
    Route::apiResource('/user', UserController::class);
    Route::get('/userShow', [UserController::class, 'show']);
    Route::get('/userName', [UserController::class, 'showNameUser']);
    Route::put('/userUpdate', [UserController::class, 'update']);
    Route::put('/userRole', [UserController::class, 'updateRole']);
    Route::put('/userPassword', [UserController::class, 'updatePasswordUser']);
    Route::get('/userDelete', [UserController::class, 'destroy']);
    Route::post('/reSendEmail', [UserController::class, 'reSendEmail']);
    Route::get('email/verify/{id}/{token}', [UserController::class, 'verifyEmail']);
    Route::post('/sendTokenRecover', [UserController::class, 'sendTokenRecover']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);

    // Avaliação check
    Route::post('/rate', [RateController::class, 'store']);
    Route::get('/rate/{id}', [RateController::class, 'index']);
    Route::get('/rateU/{id}', [RateController::class, 'showLikeUser']);
    Route::delete('/rate/{id}', [RateController::class, 'destroy']);

    // Categoria check
    Route::apiResource('/category', CategoryController::class);
});
