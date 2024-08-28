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
            $table->ulid('idOrder')->primary();
            $table->index('idMenu');
            $table->foreignUlid('idMenu')->references('idMenu')->on('menu')->onDelete('cascade')->onUpdate('cascade');
            $table->index('idItens');
            $table->foreignUlid('idItens')->references('idItens')->on('itens')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('qtdOrder')->nullable();
            $table->double('valueOrder')->nullable();
            $table->text('observation')->nullable();
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
