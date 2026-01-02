# Task Tracker

A task management app to help you stay organized. Built with React and Node.js, it lets you create, update, filter, and delete tasks with a clean interface.

## What it does

- Add tasks with titles, descriptions, priorities, and due dates
- Mark tasks as complete or pending
- Filter by status (pending/completed) or priority level
- Sort by due date or newest first
- Delete tasks you don't need anymore

The app highlights overdue tasks and shows you a dashboard with your total, completed, and pending task counts.

## Tech stack

**Frontend**
- React with Vite
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications

**Backend**
- Node.js and Express
- MongoDB Atlas for the database
- Mongoose for data modeling
- CORS enabled for cross-origin requests

## Project layout

```
task-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/     # TaskForm, TaskList, Filters, etc.
│   │   ├── services/       # API calls
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── config/             # Database connection
    ├── controllers/        # Task logic
    ├── models/             # Task schema
    ├── routes/             # API endpoints
    ├── server.js
    └── package.json
```

## Running locally

**Prerequisites:**
- Node.js installed
- MongoDB Atlas account (free tier works fine)

**Backend:**
```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=3001
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasktracker?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

Start the server:
```bash
npm start
```

Backend runs on `http://localhost:3001`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

Make sure `VITE_API_URL` in your frontend `.env` points to `http://localhost:3001/api`

## Deployment

The app is deployed with:
- Backend on Render
- Frontend on Vercel
- Database on MongoDB Atlas

When deploying, remember to:
1. Set environment variables on Render (MONGODB_URI, PORT)
2. Whitelist 0.0.0.0/0 in MongoDB Atlas Network Access
3. Update VITE_API_URL on Vercel to your Render backend URL

## API endpoints

- `GET /api/tasks` - Get all tasks (supports filtering)
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

Query params for filtering: `status`, `priority`, `sortBy`

## Contributing

Found a bug or have a suggestion? Open an issue or submit a pull request.