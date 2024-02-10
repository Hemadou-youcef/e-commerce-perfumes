<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reference' => 'required|string|max:255|unique:products',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'status' => 'nullable|string',
            'main_image' => 'required|image|mimes:jpeg,png,jpg|max:1000000',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:1000000',
            'category_ids.*' => 'nullable|exists:categories,id',
            'unit' => 'required|string|max:255',
            'type' => 'required|integer|in:1,2,3',
            'prices' => [
                'required',
                'array',
                'min:1', // Ensure there's at least one price
                function ($attribute, $value, $fail) {
                    foreach ($value as $price) {
                        if (!isset($price['price'], $price['unit'], $price['quantity'])) {
                            $fail('The prices array is invalid.');
                            return;
                        }
                    }
                },
            ],
            'prices.*.price' => 'required|numeric|min:0',
            'prices.*.unit' => 'required|string|max:255',
            'prices.*.quantity' => 'required|integer|min:0',
            'prices.*.active' => 'required|boolean',
        ];
    }



}
