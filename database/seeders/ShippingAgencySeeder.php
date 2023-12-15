<?php

namespace Database\Seeders;

use App\Models\ShippingAgency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingAgencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ShippingAgency::query()->create([
           'name' => 'Yalidine',
           'name_ar' => 'ياليدين',
        ]);
    }
}
