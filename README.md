# Banking Application 

A full-stack banking application built with React (frontend) and Express + MongoDB (backend).

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Database Setup

### Option 1: Use Shared Development Database

Connect to the shared development database with these credentials:

- **Username:** `user_admin`
- **Password:** `password`
- **Database:** `moniterdb`

### Option 2: Create Your Own Local Database

1. Install MongoDB on your machine
2. Start MongoDB service:
   ```cmd
   mongod
   ```
3. Create a new database (it will be created automatically on first connection)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```cmd
   cd backend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```
   PORT=3001
   MONGODB_URI=mongodb://user_admin:password@localhost:27017/bankdb
   ```
   
   **For your own local database, use**
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/bankdb
   ```

4. Start the backend server:
   ```cmd
   npm run dev
   ```
   
   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```cmd
   cd frontend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Start the frontend development server:
   ```cmd
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

## Project Structure

```
.
├── backend/
│   ├── model/          # Mongoose models
│   ├── route/          # Express routes
│   ├── index.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/            # React source files
│   ├── public/         # Static files
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /` - Welcome message
- `/accounts` - Account management routes
- `/transactions` - Transaction management routes

## Development

- Backend runs with nodemon for auto-reload on file changes
- Frontend uses React development server with hot reload

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB service is running
- Check if the port 27017 is not blocked
- Verify credentials in `.env` file

### Port Already in Use

If port 3001 or 3000 is already in use, change the PORT in the respective `.env` file.

## License

ISC
