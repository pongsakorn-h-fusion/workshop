# User Profile Web Application

A full-stack User Profile management app.

- **Frontend:** React 19 + Vite (`frontend/`)
- **Backend:** ASP.NET Core Web API on .NET 10 (`backend/`)

## Project structure

```
backend/    ASP.NET Core Web API (in-memory User Profile store)
frontend/   React + Vite single-page app
```

## Backend (.NET 10 API)

```bash
cd backend
dotnet run
```

The API listens on `http://localhost:5019` by default (see `Properties/launchSettings.json`).

Endpoints (`/api/user-profiles`):

| Method | Route                      | Description           |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/user-profiles`       | List all profiles      |
| GET    | `/api/user-profiles/{id}`  | Get a single profile    |
| POST   | `/api/user-profiles`       | Create a profile        |
| PUT    | `/api/user-profiles/{id}`  | Update a profile         |
| DELETE | `/api/user-profiles/{id}`  | Delete a profile         |

Data is stored in-memory (seeded with one sample profile) and resets whenever the API restarts.

## Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and talks to the API at the URL configured in `frontend/.env` (`VITE_API_BASE_URL`, defaults to `http://localhost:5019`).

## Running both together

Start the backend first (`dotnet run` in `backend/`), then the frontend (`npm run dev` in `frontend/`). CORS is already configured on the API to allow `http://localhost:5173`.
