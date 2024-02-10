<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class ClientProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return $this->getResponse(Product::activeProducts(), Category::all(), 'ClientSide/Products/products');
    }

    /**
     * @return Response
     */

    public function perfumes(): Response
    {
        return $this->getResponse(Product::perfumes(), Category::perfumesCategories()->get() , 'ClientSide/Products/perfumes');
    }

    public function accessories(): Response
    {
        return $this->getResponse(Product::accessories(), Category::accessoriesCategories()->get() , 'ClientSide/Products/accessories');
    }

    public function oils(): Response
    {
        return $this->getResponse(Product::oils(), Category::oilsCategories()->get() , 'ClientSide/Products/aromaticOils');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        return Inertia::render('ClientSide/Products/Product/product', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image_id' => $product->main_image_id,
                'categories' => $product->categories,
                'images' => $product->images,
                'active_product_prices' => $product->activeProductPrices,
                'isProductInCart' => $product->isProductInCart(),
                'isProductBookmarked' => $product->isProductBookmarked(),
                'suggestedProducts' => $product->suggestedProducts(),
            ],
            'meta_data'=>[
                'title'=> $product->name . ' | RUMAH PERFUM',
                'description'=> $product->description,
                'keywords'=> $product->name . ', ' . $product->categories->pluck('name')->implode(', '),
                'image'=> $product->mainImage->path,
                'url'=>'https://https://rumah-parfum.com/product/' . $product->id,
                'twitter_card'=>'summary_large_image',
                'twitter_url'=>'https://https://rumah-parfum.com/product/' . $product->id,
                'twitter_image'=> $product->mainImage->path,
            ]
        ]);
    }


    public function getResponse(Builder $products, Collection $categories , $render_page): Response
    {
        return Inertia::render($render_page, [
            'products' => $products
                ->when(request('q'), fn($query, $search) => $query
                    ->where('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')
                    ->orWhere('description_ar', 'LIKE', '%' . $search . '%')
                )
                ->when(request('startPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '>=', $price))
                )
                ->when(request('endPrice'), fn($query, $price) => $query
                    ->whereHas('activeProductPrices', fn($query) => $query->where('price', '<=', $price))
                )
                ->when(request('category'), function ($query, $category) {
                    // category is a string of comma separated names
                    $categories = explode(',', $category);
                    return $query->whereHas('categories', fn($query) => $query->whereIn('name', $categories));

                }
                )
                ->orderBy('created_at', 'desc')
                ->paginate(12)
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'categories' => $product->categories,
                    'active_product_prices' => $product->activeProductPrices,
                    'images' => $product->images,
                    'isProductBookmarked' => $product->isProductBookmarked()
                ])
                ->withQueryString(),
            'categories' => $categories->map(fn($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'name_ar' => $category->name_ar,
                'type' => $category->type,
            ]),
            'filters' => [
                'q' => request('q', ''),
                'startPrice' => request('startPrice', ''),
                'endPrice' => request('endPrice', ''),
                'category' => request('category', ''),
            ],
            'meta_data'=>[
                'title'=> 'Products | RUMAH PERFUM',
                'twitter_card'=>'summary_large_image',
            ]
        ]);
    }
}
