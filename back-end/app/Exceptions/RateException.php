<?php

namespace App\Exceptions;

use Exception;

class RateException extends Exception
{
    protected $message = '';
    public function render()
    {
        return response()->json([
            'error' => class_basename($this),
            'message' => $this->message,
        ]);
    }
}
