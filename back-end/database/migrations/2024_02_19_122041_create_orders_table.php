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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('idOrder');
            $table->unsignedBigInteger('idMenu');
            $table->foreign('idMenu')->references('idMenu')->on('menu')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('idItens');
            $table->foreign('idItens')->references('idItens')->on('itens')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('qtdOrder')->nullable();
            $table->double('value')->nullable();
            $table->double('desconto')->nullable();
            $table->double('tip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
