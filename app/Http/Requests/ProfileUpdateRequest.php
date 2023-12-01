<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['sometimes', 'max:255'],
            'last_name' => ['sometimes', 'max:255'],
            'username' => ['sometimes', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone' => ['sometimes', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'address' => ['sometimes', 'max:255'],
            'gender'=> ['sometimes', 'max:255' , 'in:male,female'],
            'password' => ['sometimes', 'confirmed', 'min:8'],

        ];
    }
}
