<?php

namespace App\Services;

use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryService
{
    public function index()
    {
        try {
            return new CategoryResource(Category::get());
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    
    public function store(array $data)
    {
        try {
            $data['typeCategory'] = strtolower($data['typeCategory']);
            Category::create($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function show(string $id)
    {
        try {
            $category = Category::findOrFail($id);
            return new CategoryResource($category);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function update(array $data, string $id)
    {
        try {
            Category::find($id)->update($data);
            return response()->json(['message' => 'sucess'], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroy(string $id)
    {
        try {
            Category::findOrFail($id)->delete();
            return response()->json(['message' => 'sucess'], 204);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
