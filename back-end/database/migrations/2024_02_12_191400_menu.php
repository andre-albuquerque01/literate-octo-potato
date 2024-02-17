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
            $table->unsignedBigInteger('idUser');
            $table->foreign('idUser')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('idMesa');
            $table->foreign('idMesa')->references('idMesa')->on('mesa')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('idItens');
            $table->foreign('idItens')->references('idItens')->on('itens')->onDelete('cascade')->onUpdate('cascade');
            $table->string('statusOrder', 20);
            $table->integer('quantidade');
            $table->string('methodPay');
            $table->string('value');
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
