<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  json_error('Method not allowed.', 405);
}

$cfg = app_config();
$adminKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? ($_GET['key'] ?? '');
if (!$adminKey || !hash_equals((string) $cfg['admin_key'], (string) $adminKey)) {
  json_error('Unauthorized.', 401);
}

$pdo = db();
$stmt = $pdo->query(
  'SELECT id, name, email, provider, created_at, last_login_at
   FROM users
   ORDER BY COALESCE(last_login_at, created_at) DESC
   LIMIT 500'
);
$users = $stmt->fetchAll();

json_ok([
  'count' => count($users),
  'users' => array_map(static function (array $row): array {
    return [
      'id' => (string) $row['id'],
      'name' => $row['name'],
      'email' => $row['email'],
      'provider' => $row['provider'],
      'createdAt' => $row['created_at'],
      'lastLoginAt' => $row['last_login_at'],
    ];
  }, $users),
]);
