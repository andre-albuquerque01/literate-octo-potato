<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\CategoryException;
use App\Http\Controllers\Controller;
use App\Http\Middleware\CheckAdminToken;
use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    private $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
        $this->middleware(CheckAdminToken::class)->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return $this->categoryService->index();
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            $data = $request->validated();
            return $this->categoryService->store($data);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->categoryService->show($id);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, string $id)
    {
        try {
            $data = $request->validated();
            return $this->categoryService->update($data, $id);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return $this->categoryService->destroy($id);
        } catch (\Exception $e) {
            throw new CategoryException($e->getMessage());
        }
    }
}
