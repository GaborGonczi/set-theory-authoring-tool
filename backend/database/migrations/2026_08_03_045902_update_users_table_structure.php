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
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('email', 'email_verified_at', 'remember_token');
            $table->timestamp('deleted_at')->nullable();
            $table->renameColumn('name', 'username');
            $table->renameColumn('lang', 'locale');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('locale', 2)->default('hu')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('locale', 3)->nullable()->change();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('locale', 'lang');
            $table->renameColumn('username', 'name');
            $table->dropColumn('deleted_at');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
        });
    }
};
