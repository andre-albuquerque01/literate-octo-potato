<?php

namespace App\Services;

use App\Exceptions\CategoryException;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\GeneralResource;
use App\Models\Category;

class CategoryService
{
    public function index()
    {
        try {
            return CategoryResource::collection(Category::whereNull('deleted_at')->get());
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
    
    public function store(array $data)
    {
        try {
            $data['typeCategory'] = strtolower($data['typeCategory']);
            Category::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
    public function show(string $id)
    {
        try {
            $category = Category::where('idCategory', $id)->whereNull('deleted_at')->first();
            return new CategoryResource($category);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
    public function update(array $data, string $id)
    {
        try {
            Category::where('idCategory', $id)->whereNull('deleted_at')->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
    public function destroy(string $id)
    {
        try {
            Category::where('idCategory', $id)->whereNull('deleted_at')->touch('deleted_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
}
