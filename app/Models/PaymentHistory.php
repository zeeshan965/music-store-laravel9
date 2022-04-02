<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class PaymentHistory extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var string[]
     */
    protected $guarded = ["id"];

    /**
     * @param $paymentData
     * @return void
     */
    public static function savePaymentDetails($paymentData)
    {
        $payer = $paymentData['payer'] ?? [];
        $count = count($paymentData['purchase_units']);
        self::create([
            'user_id' => Auth::id(),
            'payment_id' => $paymentData["id"] ?? "",
            "intent" => $paymentData["intent"],
            "status" => $paymentData["status"],
            "first_name" => $payer["given_name"] ?? "",
            "last_name" => $payer["surname"] ?? "",
            "email" => $payer["email_address"] ?? "",
            "payer_id" => $payer["payer_id"] ?? "",
            "links" => json_encode($paymentData["links"]) ?? "",
            "purchase_units" => json_encode($paymentData['purchase_units'][$count - 1]) ?? "",
        ]);
    }
}
