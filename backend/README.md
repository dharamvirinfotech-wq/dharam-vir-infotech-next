# DV Auth Backend (Express + JWT + MySQL)

Standalone authentication API. **This does not run inside the Lovable sandbox** — run it locally or deploy it to a Node.js host (Render, Railway, VPS, etc.).

## Stack
- Express 4
- MySQL via `mysql2/promise` (connection pool)
- JWT (`jsonwebtoken`) with bcrypt password hashing
- Validation: `express-validator`
- Security: `helmet`, `cors`, `express-rate-limit`

## Setup

```bash
cd backend
cp .env.example .env       # then edit values
npm install
npm run migrate            # creates database + users table
npm run dev                # starts on http://localhost:4000
```

## Endpoints

Base URL: `http://localhost:4000/api`

| Method | Path             | Auth        | Description                |
|--------|------------------|-------------|----------------------------|
| GET    | `/health`        | —           | Health check               |
| POST   | `/auth/register` | —           | Create account, returns JWT |
| POST   | `/auth/login`    | —           | Login, returns JWT         |
| GET    | `/auth/me`       | Bearer JWT  | Current user profile       |
| GET    | `/users`         | Admin JWT   | List all users             |

### Register body
```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 90000 00000",
  "password": "secret123",
  "role": "user",
  "company_name": "Acme",
  "two_factor_enabled": false
}
```

### Login body
```json
{ "email": "jane@example.com", "password": "secret123" }
```

Send the returned token as `Authorization: Bearer <token>` on protected routes.

## Connect from the Lovable frontend

Set an env var in your Vite app (e.g. `VITE_API_URL=http://localhost:4000/api`) and call:

```ts
const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { token, user } = await res.json();
localStorage.setItem('token', token);
```

Make sure `CORS_ORIGIN` in `backend/.env` matches your frontend URL.

## Notes
- Use a long random `JWT_SECRET` in production (e.g. `openssl rand -hex 64`).
- The default rate limiter allows 20 auth attempts per 15 minutes per IP.
- Roles supported: `admin`, `editor`, `user`.
