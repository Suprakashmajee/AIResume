<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_error('Method not allowed.', 405);
}

$body = read_json_body();
$name = trim((string) ($body['name'] ?? ''));
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');

if ($name === '' || mb_strlen($name) < 2) {
  json_error('Please enter your full name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_error('Please enter a valid email address.');
}
if (strlen($password) < 6) {
  json_error('Password must be at least 6 characters.');
}

$pdo = db();
$exists = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$exists->execute([$email]);
if ($exists->fetch()) {
  json_error('An account with this email already exists. Please log in.');
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare(
  'INSERT INTO users (name, email, password_hash, picture, provider, last_login_at)
   VALUES (?, ?, ?, "", "email", NOW())'
);
$stmt->execute([$name, $email, $hash]);
$userId = (int) $pdo->lastInsertId();

$row = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$row->execute([$userId]);
$user = $row->fetch();
$token = issue_token($pdo, $userId);

json_ok([
  'token' => $token,
  'user' => public_user($user),
], 201);
