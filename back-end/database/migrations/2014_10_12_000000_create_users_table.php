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
        Schema::create('users', function (Blueprint $table) {
            $table->id('idUser');
            $table->string('firstName', 60);
            $table->string('lastName', 60);
            $table->string('DDD', 3);
            $table->string('phoneNumber', 11);
            $table->string('role', 10);
            $table->string('cpf', 14)->unique();
            $table->string('email', 120)->unique();
            $table->boolean('term_aceite');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
