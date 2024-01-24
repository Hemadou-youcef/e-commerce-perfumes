<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'products' =>  'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.product_price_id' => 'required|exists:product_prices,id',
            'products.*.reservations' => 'required|array|min:1',
            'products.*.reservations.*.reception_id' => 'required|exists:receptions,id',
            'products.*.reservations.*.quantity' => 'required|integer',
        ];
    }
}
