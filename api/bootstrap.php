<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
  'https://airesumedraft.com',
  'https://www.airesumedraft.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
if (in_array($origin, $allowed, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Key');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

function app_config(): array
{
  static $config = null;
  if ($config !== null) {
    return $config;
  }
  $path = __DIR__ . '/config.php';
  if (!is_file($path)) {
    json_error('Server config missing. Upload api/config.php.', 500);
  }
  /** @var array $config */
  $config = require $path;
  return $config;
}

function db(): PDO
{
  static $pdo = null;
  if ($pdo instanceof PDO) {
    return $pdo;
  }
  $cfg = app_config();
  $dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=%s',
    $cfg['db_host'],
    $cfg['db_name'],
    $cfg['db_charset'] ?? 'utf8mb4'
  );
  try {
    $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  } catch (Throwable $e) {
    json_error('Database connection failed.', 500);
  }
  ensure_schema($pdo);
  return $pdo;
}

function ensure_schema(PDO $pdo): void
{
  $pdo->exec(
    'CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NULL,
      picture VARCHAR(500) NOT NULL DEFAULT "",
      provider ENUM("email","google") NOT NULL DEFAULT "email",
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login_at TIMESTAMP NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
  );

  $pdo->exec(
    'CREATE TABLE IF NOT EXISTS auth_tokens (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_auth_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
  );
}

function json_ok(array $data, int $code = 200): void
{
  http_response_code($code);
  echo json_encode(['ok' => true] + $data, JSON_UNESCAPED_SLASHES);
  exit;
}

function json_error(string $message, int $code = 400, array $extra = []): void
{
  http_response_code($code);
  echo json_encode(['ok' => false, 'error' => $message] + $extra, JSON_UNESCAPED_SLASHES);
  exit;
}

function read_json_body(): array
{
  $raw = file_get_contents('php://input');
  if ($raw === false || trim($raw) === '') {
    return [];
  }
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    json_error('Invalid JSON body.');
  }
  return $data;
}

function public_user(array $row): array
{
  return [
    'id' => (string) $row['id'],
    'name' => $row['name'],
    'email' => $row['email'],
    'picture' => $row['picture'] ?? '',
    'provider' => $row['provider'] ?? 'email',
    'createdAt' => $row['created_at'] ?? null,
    'lastLoginAt' => $row['last_login_at'] ?? null,
  ];
}

function issue_token(PDO $pdo, int $userId): string
{
  $token = bin2hex(random_bytes(32));
  $hash = hash('sha256', $token);
  $expires = (new DateTimeImmutable('+60 days'))->format('Y-m-d H:i:s');
  $stmt = $pdo->prepare(
    'INSERT INTO auth_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)'
  );
  $stmt->execute([$userId, $hash, $expires]);
  return $token;
}

function bearer_token(): ?string
{
  $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
  if (preg_match('/Bearer\s+(\S+)/i', $header, $m)) {
    return $m[1];
  }
  return null;
}

function require_user(PDO $pdo): array
{
  $token = bearer_token();
  if (!$token) {
    json_error('Not authenticated.', 401);
  }
  $hash = hash('sha256', $token);
  $stmt = $pdo->prepare(
    'SELECT u.* FROM auth_tokens t
     INNER JOIN users u ON u.id = t.user_id
     WHERE t.token_hash = ? AND t.expires_at > NOW()
     LIMIT 1'
  );
  $stmt->execute([$hash]);
  $user = $stmt->fetch();
  if (!$user) {
    json_error('Session expired. Please log in again.', 401);
  }
  return $user;
}

function touch_login(PDO $pdo, int $userId): void
{
  $stmt = $pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?');
  $stmt->execute([$userId]);
}
