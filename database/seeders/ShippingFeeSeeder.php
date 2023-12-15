<?php

namespace Database\Seeders;

use App\Helpers\WilayaMapper;
use App\Helpers\YalidineTarifications;
use App\Models\ShippingAgency;
use App\Models\ShippingFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $wilayas = new WilayaMapper();
        foreach ($wilayas->getWilayas() as $wilaya_code => $names) {
            ShippingAgency::where('name', 'Yalidine')->first()->shippingFees()->create([
                'wilaya' => $names[0],
                'wilaya_ar' => $names[1],
                'wilaya_code' => $wilaya_code,

            ]);

        };

    }
}
