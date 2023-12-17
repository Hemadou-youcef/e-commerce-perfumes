<?php

namespace App\Models;

use App\Helpers\WilayaMapper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingAgency extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'name_ar',
        'active',
    ];




    public function shippingFees(): HasMany
    {
        return $this->hasMany(ShippingFee::class);
    }


    public function fillDefaultWilayas(): void
    {
        $wilayas = new WilayaMapper();

        foreach ($wilayas->getWilayas() as  $wilayaCode => $wilayaNames) {
            $this->shippingFees()->create([
                'wilaya' => $wilayaNames[0], // Assuming the first element is the French name
                'wilaya_ar' => $wilayaNames[1], // Assuming the second element is the Arabic name
                'wilaya_code' => $wilayaCode,
                'home_delivery_price' => 0,
                'agency_delivery_price' => 0,
            ]);
        }

    }

    public static function activeAgencies(): Builder
    {
        return self::where('active', true);
    }
}
