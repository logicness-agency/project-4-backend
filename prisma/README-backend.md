# MovieTracker — Backend (Express + Prisma)

## Description
This is the **backend** of the MovieTracker app.  
It’s built with Express, TypeScript, Prisma and PostgreSQL.  
It provides the API used by the React frontend.

The frontend repository can be found here:  
https://github.com/logicness-agency/project-4-frontend

## How to run this project locally

### 1. Clone this repo
```bash
git clone https://github.com/logicness-agency/project-4-backend.git
cd project-4-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a file called **`.env`** in the root of the backend folder.  
Add the following:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/movietracker"
PORT=3000
```

### 4. Run migrations
```bash
npx prisma migrate dev
```

### 5. Start the server
For development:
```bash
npm run dev
```
For production:
```bash
npm start
```

By default, the API will be available at:  
http://localhost:3000

## Demo
Live backend: https://movietracker-txin.onrender.com
