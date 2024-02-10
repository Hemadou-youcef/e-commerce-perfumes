<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'pinned_products' => \App\Models\Product::pinnedProducts()->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image_id' => $product->main_image_id,
                'categories' => $product->categories,
                'main_image' => $product->mainImage,


            ]),
            'for_you_perfumes' => Product::perfumes()->take(10)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'type' => $product->type,
                    'active_product_prices' => $product->activeProductPrices,
                    'main_image' => $product->mainImage,
                    ];
            }),
            'for_you_accessories' => Product::accessories()->take(10)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'type' => $product->type,
                    'active_product_prices' => $product->activeProductPrices,
                    'main_image' => $product->mainImage,
                    ];
            }),
            'for_you_oils' => Product::oils()->take(10)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'description_ar' => $product->description_ar,
                    'main_image_id' => $product->main_image_id,
                    'type' => $product->type,
                    'active_product_prices' => $product->activeProductPrices,
                    'main_image' => $product->mainImage,
                    ];
            }),
            'trending_products' => $this->trending_products(),
            'meta_data'=>[
                'title'=>'HOME | RUAMAH PERFUM',
                'description'=>'عالم العطور ، عالم يجسد الرقي و الجمال والبهجة ، والعطور الفاخرة تدل على تفرد المنتجات الممتازة ؛ الرماح للعطور شركة شغوفة تأسست بفضل الله عام 2019 م في وقت نهضة العطور الحديثة  . من الهضاب العليا شمال بلدي الجزائر نأخذ طريقا رائدا في في مجال بيع العطور الزيتية و صناعة مواد التجميل و التنظيف البدني',
                'image'=>'/image/meta-logo.jpg',
                'url'=>'https://https://rumah-parfum.com/',
                'twitter_card'=>'summary_large_image',
                'twitter_url'=>'https://https://rumah-parfum.com/',
                'twitter_image'=>'/image/meta-logo.jpg',
            ]
        ]);

    }


    public function trending_products(): \Illuminate\Support\Collection
    {
        $firstDayOfMonth = now()->startOfMonth();



        $firstDayOfMonth = Carbon::now()->startOfMonth();

        $trending = DB::table('order_products')
            ->select('product_id', DB::raw('count(*) as total'))
            ->where('created_at', '>=', $firstDayOfMonth)
            ->groupBy('product_id')

            ->orderBy('total', 'desc')
            ->take(10)
            ->get()->pluck('product_id');

        return Product::query()->whereIn('id', $trending)->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'description_ar' => $product->description_ar,
                'main_image_id' => $product->main_image_id,
                'type' => $product->type,
                'active_product_prices' => $product->activeProductPrices,
                'main_image' => $product->mainImage,
                ];
        });

    }
}
