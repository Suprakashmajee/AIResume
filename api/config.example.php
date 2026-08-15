<?php
/**
 * Copy to config.php on the server and fill in Hostinger MySQL details.
 * config.php is gitignored so secrets are not committed.
 */
return [
  'db_host' => 'localhost',
  'db_name' => 'u116887753_airesumedraft',
  'db_user' => 'u116887753_airesumedraft',
  'db_pass' => 'CHANGE_ME',
  'db_charset' => 'utf8mb4',
  // Optional: protect /api/admin-users.php
  'admin_key' => 'CHANGE_ME_ADMIN_KEY',
];
