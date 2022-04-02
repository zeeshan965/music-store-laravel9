<?php

if (!function_exists('generateUniqueId')) {
    function generateUniqueId(): string
    {
        return base64_encode(time() . '-' . uniqid());
    }
}
