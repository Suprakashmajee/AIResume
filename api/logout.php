<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_error('Method not allowed.', 405);
}

$pdo = db();
$token = bearer_token();
if ($token) {
  $hash = hash('sha256', $token);
  $stmt = $pdo->prepare('DELETE FROM auth_tokens WHERE token_hash = ?');
  $stmt->execute([$hash]);
}

json_ok(['loggedOut' => true]);
