<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReceptionRequest extends FormRequest
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
            'quantity' => ['required', 'numeric', 'min:1'],
            'product_id' => ['required', 'exists:products,id'],
            'price' => ['required', 'numeric', 'min:1'],
            'name' => ['required', 'string'],
            'rest' => ['required', 'numeric', 'min:0'],
            'unit' => ['required', 'string'],
            'type' => ['required', 'string'],
            'status' => ['required', 'string'],
        ];
    }
}
