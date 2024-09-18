<?php

namespace App\Services;

use App\Exceptions\OrderException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderService
{
    public function index()
    {
        try {
            $order = Order::with(['menu', 'itens'])->whereNull('deleted_at')->paginate();
            return OrderResource::collection($order);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            Order::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function show(string $id)
    {
        try {
            $order = Order::with(['menu', 'itens' => function ($query) {
                $query->whereNull('deleted_at');
            }])
                ->where('orders.idOrder', $id)
                ->whereNull('deleted_at')
                ->paginate();
            return OrderResource::collection($order);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function getMenuOrder(string $id)
    {
        try {
            $order = Order::whereHas('menu', function ($query) use ($id) {
                $query->where('menu.idMenu', $id)->whereNull('deleted_at');
            })
                ->with(['menu.mesa', 'itens' => function ($query) {
                    $query->whereNull('deleted_at');
                }])
                ->whereNull('deleted_at')
                ->get();
            return OrderResource::collection($order);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function showMenuUser(string $id)
    {
        try {
            $order = Order::whereHas('menu', function ($query) use ($id) {
                $query->where('menu.idMenu', $id)
                ->whereNull('deleted_at')
                ->where('menu.statusOrder', '=', 0);
            })
                ->with(['menu', 'itens' => function ($query) {
                    $query->whereNull('deleted_at');
                }])
                ->whereNull('deleted_at')->get();
            return OrderResource::collection($order);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function update(array $data, string $id)
    {
        try {
            Order::where('idOrder', $id)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try {
            Order::where('idOrder', $id)->touch('deleted_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new OrderException($e->getMessage());
        }
    }
}
