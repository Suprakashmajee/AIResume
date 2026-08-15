<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_error('Method not allowed.', 405);
}

$body = read_json_body();
$email = strtolower(trim((string) ($body['email'] ?? '')));
$password = (string) ($body['password'] ?? '');
$provider = (string) ($body['provider'] ?? 'email');
$name = trim((string) ($body['name'] ?? ''));
$picture = trim((string) ($body['picture'] ?? ''));
$googleId = trim((string) ($body['googleId'] ?? ''));

$pdo = db();

if ($provider === 'google') {
  if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Google sign-in did not return a valid email.');
  }
  if ($name === '') {
    $name = explode('@', $email)[0];
  }

  $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  if ($user) {
    $upd = $pdo->prepare(
      'UPDATE users SET name = ?, picture = ?, provider = CASE WHEN provider = "email" THEN provider ELSE "google" END, last_login_at = NOW() WHERE id = ?'
    );
    $upd->execute([$name, $picture, $user['id']]);
    $userId = (int) $user['id'];
  } else {
    $ins = $pdo->prepare(
      'INSERT INTO users (name, email, password_hash, picture, provider, last_login_at)
       VALUES (?, ?, NULL, ?, "google", NOW())'
    );
    $ins->execute([$name, $email, $picture]);
    $userId = (int) $pdo->lastInsertId();
  }

  $row = $pdo->prepare('SELECT * FROM users WHERE id = ?');
  $row->execute([$userId]);
  $user = $row->fetch();
  $token = issue_token($pdo, $userId);

  json_ok([
    'token' => $token,
    'user' => public_user($user),
    'googleId' => $googleId,
  ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_error('Please enter a valid email address.');
}
if ($password === '') {
  json_error('Please enter your password.');
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();
if (!$user || empty($user['password_hash']) || !password_verify($password, $user['password_hash'])) {
  json_error('Invalid email or password.', 401);
}

touch_login($pdo, (int) $user['id']);
$token = issue_token($pdo, (int) $user['id']);

$row = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$row->execute([(int) $user['id']]);
$user = $row->fetch();

json_ok([
  'token' => $token,
  'user' => public_user($user),
]);
