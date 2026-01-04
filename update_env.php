<?php
$env = file_get_contents('.env');
$env = preg_replace('/DB_CONNECTION=sqlite/', 'DB_CONNECTION=mysql', $env);
$env = preg_replace('/# DB_HOST=127.0.0.1/', 'DB_HOST=127.0.0.1', $env);
$env = preg_replace('/# DB_PORT=3306/', 'DB_PORT=3306', $env);
$env = preg_replace('/# DB_DATABASE=laravel/', 'DB_DATABASE=efl', $env);
$env = preg_replace('/# DB_USERNAME=root/', 'DB_USERNAME=root', $env);
$env = preg_replace('/# DB_PASSWORD=/', 'DB_PASSWORD=', $env);
file_put_contents('.env', $env);
echo "Updated .env";
