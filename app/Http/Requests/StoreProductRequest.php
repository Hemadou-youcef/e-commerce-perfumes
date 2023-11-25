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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'description_ar' => 'required|string',
            'status' => 'nullable|string',
            'main_image' => 'required|image|mimes:jpeg,png,jpg|max:8192',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:8192',
            'category_ids.*' => 'nullable|exists:categories,id',
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
        ];
    }



}
