<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'description_ar' => 'sometimes|required|string',
            'status' => 'nullable|string',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg|max:8192',
            'type' => 'sometimes|required|integer|in:1,2,3',
            'category_ids.*' => 'sometimes|exists:categories,id',
            'prices' => [
                'sometimes',
                'array',
                'min:1', // Ensure there's at least one price
                function ($attribute, $value, $fail) {
                    foreach ($value as $price) {
                        if (!isset($price['price'], $price['unit'], $price['quantity'] , $price['active'])) {
                            $fail('The prices array is invalid.');
                            return;
                        }
                    }
                },
            ],
            'prices.*.id' => 'sometimes|exists:product_prices,id',
            'prices.*.price' => 'sometimes|required|numeric|min:0',
            'prices.*.unit' => 'sometimes|required|string|max:255',
            'prices.*.quantity' => 'sometimes|required|integer|min:0',
            'prices.*.active' => 'sometimes|required|boolean',






            'other_images.*' => 'sometimes|required|image|mimes:jpeg,png,jpg|max:8192',
            'removed_images.*' => 'sometimes|exists:images,id',
        ];
    }
}
