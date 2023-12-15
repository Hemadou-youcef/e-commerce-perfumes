<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipping_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shipping_agency_id')->constrained()->cascadeOnDelete();
            $table->string('wilaya');
            $table->string('wilaya_ar');
            $table->integer('wilaya_code');
            $table->integer('home_delivery_price')->default(0);
            $table->integer('agency_delivery_price')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_fees');
    }
};
