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
            Schema::create('siswas', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users');
                $table->integer('nisn')->unique();
                $table->string('nama');
                // update to foreign 
                $table->foreignId('kelas_id')->constrained('kelas');
                $table->string('alamat')->nullable();
                $table->string('tanggal_lahir');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('siswas');
        }
    };
