<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property mixed $role
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'address',
        'phone',
        'gender',
        'role',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function receptions(): HasMany
    {
        return $this->hasMany(Reception::class);
    }
    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }





    public function emptyCart()
    {
        $this->cartItems()->delete();

    }

    public function verifiedOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'verified_by');
    }

    public function confirmedOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'confirmed_by');

    }

    public function deliveredOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'delivered_by');

    }

    public function cancelledOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'cancelled_by');
    }

    public function isSuperAdmin(): bool
    {
        return $this->role == 4;
    }
    public function isAdmin(): bool
    {

        return $this->role == 3 || $this->isSuperAdmin();
    }
    public function isEmployee(): bool
    {
        return $this->role == 2;
    }

    public function isClient(): bool
    {

        return $this->role == 1;
    }

    public function isGuest(): bool
    {

        return $this->role == 0;
    }


}
