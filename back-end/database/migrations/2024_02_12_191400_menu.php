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
            $table->id('idMenu');
            $table->string('codigo')->unique();
            $table->unsignedBigInteger('idMesa');
            $table->foreign('idMesa')->references('idMesa')->on('mesa')->onDelete('cascade')->onUpdate('cascade');
            $table->string('cpf', 14);
            $table->string('statusOrder', 20)->nullable();
            $table->string('methodPay')->nullable();
            $table->string('value')->nullable();
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
        Schema::dropIfExists('menu');
    }
};
