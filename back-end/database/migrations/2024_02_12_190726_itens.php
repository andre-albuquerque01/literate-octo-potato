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
        Schema::create('itens', function (Blueprint $table) {
            $table->ulid('idItens')->primary();
            $table->string('codigo')->unique();
            $table->string('title');
            $table->string('desc');
            $table->double('value');
            $table->boolean('statusIten')->nullable(false);
            $table->integer('qtdIten');
            $table->string('urlImage');
            $table->string('waitTime');
            $table->string('position');
            $table->index('idCategory');
            $table->foreignUlid("idCategory")->references('idCategory')->on("categories")->onDelete("cascade")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itens');
    }
};
