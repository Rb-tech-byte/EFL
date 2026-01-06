<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=efl', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("DROP TABLE IF EXISTS users");
    echo "Table dropped.\n";

    $sql = "CREATE TABLE users (
        id bigint unsigned not null auto_increment primary key,
        name varchar(255) not null,
        email varchar(255) not null unique,
        email_verified_at timestamp null,
        password varchar(255) not null,
        role enum('admin', 'staff', 'student') default 'student',
        remember_token varchar(100) null,
        created_at timestamp null,
        updated_at timestamp null,
        deleted_at timestamp null
    ) default character set utf8mb4 collate 'utf8mb4_unicode_ci'";

    $pdo->exec($sql);
    echo "Table created successfully.\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
