<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;
use App\Models\Bookmark;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ClientSide/bookmarks/bookmarks', [
            'bookmarks' => Auth::user()->bookmarks()->with([
                'product' => function ($query) {
                    $query->select('id', 'name', 'description', 'description_ar', 'main_image_id');
                },
                'product.mainImage',
                'product.categories',

            ])->get()
            ,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookmarkRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Auth::user()->bookmarks()->create($validated);

        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookmark $bookmark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        $this->authorize('delete', $bookmark);

        $bookmark->delete();
        return redirect()->back();
    }

    public function destroyByProductId($productId): RedirectResponse
    {
        error_log($productId);
        $bookmark = Auth::user()->bookmarks()->where('product_id', $productId)->firstOrFail();
        $this->authorize('delete', $bookmark);
        $bookmark->delete();
        return redirect()->back();
    }
}
