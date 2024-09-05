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
        Schema::create('menu', function (Blueprint $table) {
            $table->ulid('idMenu')->primary();
            $table->string('codigo')->unique();
            $table->index('idMesa');
            $table->foreignUlid('idMesa')->references('idMesa')->on('mesa')->onDelete('cascade')->onUpdate('cascade');
            $table->string('cpf', 14);
            $table->boolean('statusOrder')->nullable();
            $table->string('methodPay')->nullable();
            $table->string('value')->nullable();
            $table->double('desconto')->nullable();
            $table->double('tip')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};
