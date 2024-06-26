<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard/Categories/categories', [
            'categories' => Category::query()
                ->when(request('q'), function ($query) {
                    $query->where('name', 'LIKE', '%' . request('q') . '%');
                })
                ->when(request('type'), function ($query) {
                    $query->where('type', request('type'));
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Categories/categoriesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return redirect()->route('categories')->with('success', 'Category created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $products = $category->products()->paginate(10);
        return Inertia::render('Dashboard/Categories/category', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
                'type' => $category->type,
                'products' => $products,
                'created_at' => $category->created_at->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Dashboard/Categories/categoriesForm', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'type' => $category->type,
                'name_ar' => $category->name_ar,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('category', $category)->with('success', 'Category updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories')->with('success', 'Category deleted.');
    }
}
