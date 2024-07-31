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
        Mail::to($event->email)->send(new VerifyEmail([
            'toEmail' => $event->email,
            'subject' => 'Verificação de e-mail',
            'message' => $event->id,
            'token' => $event->token
        ]));
    }
}
