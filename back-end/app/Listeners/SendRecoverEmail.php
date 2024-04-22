<?php

namespace App\Listeners;

use App\Events\UserRecoverPassword;
use App\Mail\RecoverPassword;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRecoverEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRecoverPassword $event): void
    {
        Mail::to($event->email)->send(new RecoverPassword([
            'toEmail' => $event->email,
            'subject' => 'Redefinir senha',
            'message' => $event->token,
            'expiration_hours' => "10 minutos"
        ]));
    }
}
