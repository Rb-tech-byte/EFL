<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * This file redirects all requests to the public directory
 * where the actual Laravel application entry point is located.
 */

// Redirect to public folder
header('Location: /public/index.php' . ($_SERVER['REQUEST_URI'] !== '/' ? $_SERVER['REQUEST_URI'] : ''));
exit;
