# Student Task & Attendance Manager

A beginner-friendly MERN college project for managing subjects, attendance, tasks, notes and a student profile.

## Features

- JWT authentication with bcrypt password hashing
- Subject, task, attendance and notes CRUD
- Attendance percentages and dashboard summary
- Task priorities, deadlines and completion status
- Searchable notes and responsive React UI
- Ownership checks on every protected resource

## Technology

React + Vite, React Router, Axios, Node.js, Express, MongoDB Atlas, Mongoose, JWT and bcryptjs.

## Setup

1. Install Node.js and create a MongoDB Atlas database.
2. In `backend`, copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
3. Install and start the API:

```powershell
cd backend
npm install
npm run dev
```

4. In a second terminal, install and start the client:

```powershell
cd frontend
npm install
npm run dev
```

The client uses `http://localhost:5000/api` by default. Override it with `VITE_API_URL`.

## API endpoints

`POST /api/auth/register`, `POST /api/auth/login`, `GET/PUT /api/auth/profile`

`GET/POST/PUT/DELETE /api/subjects`

`GET/POST/PUT/DELETE /api/tasks`, `PATCH /api/tasks/:id/complete`

`GET/POST/PUT/DELETE /api/attendance`, `GET /api/attendance/stats`

`GET/POST/PUT/DELETE /api/notes`

Protected endpoints require `Authorization: Bearer <token>`.

## Project structure

- `backend/models`: Mongoose data models
- `backend/controllers`: request handlers
- `backend/routes`: REST routes
- `backend/middleware`: JWT authorization
- `frontend/src`: React pages, routing, API client and styles

## Testing checklist

Register/login, duplicate email, protected routes, CRUD for each resource, task completion, attendance percentage, note search, profile update, logout, invalid token and cross-user access.

## Future improvements

Calendar integration, reminders, exportable attendance reports and teacher/admin accounts.
