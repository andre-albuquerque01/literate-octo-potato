<?php

namespace App\Jobs;

use App\Events\UserRegistered;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendVerifyEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $email, $token, $id;
    /**
     * Create a new event instance.
     */
    public function __construct(string $email, string $token, string $id)
    {
        $this->email = $email;
        $this->token = $token;
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        event(new UserRegistered($this->email, $this->token, $this->id));
    }
}
