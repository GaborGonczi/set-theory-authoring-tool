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
        Schema::create('expressions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained();
            $table->string('statement',255);
            $table->string('result',255);
            $table->smallInteger('start',false)->unsigned();
            $table->smallInteger('end',false)->unsigned();
            $table->boolean('noparse')->default(false);
            $table->smallInteger('row',false)->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expressions');
    }
};
