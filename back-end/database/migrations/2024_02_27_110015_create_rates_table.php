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
        Schema::create('rates', function (Blueprint $table) {
            $table->ulid('idRate')->primary();
            $table->index('idUser');
            $table->foreignUlid('idUser')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->index('idItens');
            $table->foreignUlid('idItens')->references('idItens')->on('itens')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
