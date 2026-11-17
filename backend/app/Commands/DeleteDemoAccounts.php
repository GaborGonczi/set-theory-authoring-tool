<?php

namespace App\Commands;

use App\Events\UserDeleted;
use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

#[Signature('demo:delete')]
#[Description('Delete demo accounts')]
class DeleteDemoAccounts extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::transaction(function () {
            $userIds = User::where('username', 'like', 'demo_%')->pluck('id');

            $fileIds = DB::table('files')
                ->whereIn('user_id', $userIds)
                ->pluck('id');

            DB::table('expressions')->whereIn('file_id', $fileIds)->delete();
            DB::table('variables')->whereIn('file_id', $fileIds)->delete();
            DB::table('files')->whereIn('id', $fileIds)->delete();
            DB::table('users')->whereIn('id', $userIds)->delete();

            DB::afterCommit(function () use ($userIds) {
                foreach ($userIds as $userId) {
                    UserDeleted::dispatch($userId);
                }
            });

        });
    }
}
