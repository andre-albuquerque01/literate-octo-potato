<?php

namespace App\Services;

use App\Http\Resources\TableResource;
use App\Models\Table;

class TableService
{

    public function index()
    {
        try {
            $table = Table::paginate();
            return TableResource::collection($table);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function store(array $data)
    {
        try {
            Table::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function show(string $id)
    {
        try {
            $table = Table::findOrFail($id);
            return new TableResource($table);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function update(array $data, string $id)
    {
        try {
            Table::where('idTable', $id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroy(string $id)
    {
        try {
            Table::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
