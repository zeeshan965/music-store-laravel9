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
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->enum('media_type', ['video', 'audio'])->nullable();
            $table->integer('created_by')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->text('author')->nullable();
            $table->string('cover')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('genres')->nullable();
            $table->string('duration')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->string('src_url')->nullable();
            $table->string('trailer_url')->nullable();
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
        Schema::dropIfExists('media_files');
    }
};
