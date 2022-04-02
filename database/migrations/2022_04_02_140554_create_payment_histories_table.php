<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("user_id")->nullable();
            $table->unsignedInteger("media_id")->nullable();
            $table->string("payment_id", 100)->nullable();
            $table->string("payer_id", 100)->nullable();
            $table->string("intent", 20)->nullable();
            $table->string("status", 20)->nullable();
            $table->string("first_name", 50)->nullable();
            $table->string("last_name", 50)->nullable();
            $table->string("email")->nullable();
            $table->text("links")->nullable();
            $table->text("purchase_units")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_histories');
    }
};
