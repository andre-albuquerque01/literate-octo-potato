<?php

namespace App\Services;

use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderService
{
    public function index()
    {
        try {
            $order = Order::join('menu', 'menu.idMenu', '=', 'orders.idMenu')->join('itens', 'itens.idItens', '=', 'orders.idItens')->paginate();
            return OrderResource::collection($order);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(array $data)
    {
        try {
            Order::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function show(string $id)
    {
        try {
            $order = Order::join('menu', 'menu.idMenu', '=', 'orders.idMenu')->join('itens', 'itens.idItens', '=', 'orders.idItens')->where('orders.idOrder', $id)->paginate();
            return OrderResource::collection($order);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Order::where('idOrder', $id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy(string $id)
    {
        try {
            Order::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
