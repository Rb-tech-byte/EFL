<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$columns = Illuminate\Support\Facades\Schema::getColumnListing('programs');
echo implode(', ', $columns);
