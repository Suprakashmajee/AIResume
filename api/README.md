# AiResumeDraft API (Hostinger PHP + MySQL)

## Endpoints
- `POST /api/register.php` — create account `{ name, email, password }`
- `POST /api/login.php` — email login or Google sync
- `GET /api/profile.php` — current user (Bearer token)
- `PATCH /api/profile.php` — update name/picture
- `POST /api/logout.php` — revoke token
- `GET /api/admin-users.php` — list users (header `X-Admin-Key` or `?key=`)

## Setup
1. Copy `config.example.php` to `config.php` and set MySQL credentials.
2. Upload the `api/` folder to `public_html/api/`.
3. Tables are created automatically on first request.

## View login data
- phpMyAdmin → `users` table, or
- `https://airesumedraft.com/api/admin-users.php?key=YOUR_ADMIN_KEY`
