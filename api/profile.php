<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $user = require_user($pdo);
  json_ok(['user' => public_user($user)]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
  $user = require_user($pdo);
  $body = read_json_body();
  $name = trim((string) ($body['name'] ?? $user['name']));
  $picture = trim((string) ($body['picture'] ?? $user['picture']));

  if ($name === '' || mb_strlen($name) < 2) {
    json_error('Please enter your full name.');
  }
  if (mb_strlen($picture) > 500) {
    json_error('Picture URL is too long.');
  }

  $stmt = $pdo->prepare('UPDATE users SET name = ?, picture = ? WHERE id = ?');
  $stmt->execute([$name, $picture, $user['id']]);

  $row = $pdo->prepare('SELECT * FROM users WHERE id = ?');
  $row->execute([$user['id']]);
  json_ok(['user' => public_user($row->fetch())]);
}

json_error('Method not allowed.', 405);
