<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\VerifyEmail;
use App\Services\UserService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class SendVerifyEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        Mail::to($event->user->email)->send(new VerifyEmail([
            'toEmail' => $event->user->email,
            'subject' => "Verificação do e-mail",
            'message' => Crypt::encryptString($event->user->email)
        ]));
    }
}
