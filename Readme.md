# Mind Blog — Personal Blog Posting Platform

A full-stack blog posting platform built for reading, writing, and sharing ideas with the world. Features a React frontend with Tailwind CSS and a Node.js/Express backend powered by MongoDB and Redis caching.

## Tech Stack

### Frontend

- **React 19** with React Router v7
- **Vite 7** — dev server & build tool
- **Tailwind CSS 4** — utility-first styling
- **MUI (Material UI) 9** — UI component library
- **React Markdown** with `remark-gfm` — render Markdown content
- **DOMPurify** — XSS-safe HTML sanitization
- **Lucide React** — icon set
- **React Helmet** — dynamic `<head>` management for SEO
- **Axios** — HTTP client

### Backend

- **Node.js** with **Express 5**
- **MongoDB** via **Mongoose 8**
- **Redis** — response caching (1-hour TTL for blog posts)
- **JWT** — token-based authentication
- **bcrypt** — password hashing
- **Zod** — request validation
- **Helmet** — HTTP security headers
- **xss** — input sanitization
- **express-useragent** — bot detection

### DevOps

- **Docker** & **Docker Compose** — containerised local development
- **Vercel** — deployment configuration for both frontend and backend

## Features

- **User Authentication** — sign up, sign in with JWT-based sessions (1-hour expiry)
- **Blog CRUD** — create, read, edit, and delete blog posts with Markdown support
- **SEO-Friendly Slugs** — auto-generated URL slugs from post titles
- **Public / Private Posts** — toggle post visibility
- **Comments** — add, edit, and delete comments with ownership checks
- **Redis Caching** — cached blog post reads for faster page loads
- **Rate Limiting** — 100 requests per IP per minute
- **Security Hardened** — Helmet headers, CORS origin guard, bot filtering, XSS sanitization
- **Protected Routes** — dashboard, profile, settings, create, and edit pages require authentication
- **Responsive Design** — mobile-friendly layout with Tailwind CSS
- **Share Button** — share posts via native share or clipboard

## Project Structure

```
codsoft-pro-blog-post-site/
├── backend/
│   ├── auth/
│   │   └── middleware.js        # JWT auth & ownership checks
│   ├── db/
│   │   ├── blogs.js             # Blog schema (title, content, slug, author, isPublic)
│   │   ├── comment.js           # Comment schema
│   │   └── users.js             # User schema (email, password, username)
│   ├── lib/
│   │   ├── dbConnect.js         # MongoDB connection helper
│   │   └── redis.main.js        # Redis client setup
│   ├── middlewares/
│   │   └── rateLimiter.js       # IP-based rate limiter
│   ├── routes/
│   │   ├── blogs.js             # Blog CRUD endpoints
│   │   ├── comments.js          # Comment endpoints
│   │   ├── home.js              # Home route
│   │   └── users.js             # Auth endpoints (signup/signin)
│   ├── utils/
│   │   └── slugify.js           # URL slug generator
│   ├── server.js                # Express app entry point
│   ├── Dockerfile
│   ├── docker-compose.yml       # Backend + MongoDB + Redis
│   ├── vercel.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BlogsCard/       # Blog card component
│   │   │   ├── Navbar/          # Navigation bar
│   │   │   ├── Posts/            # Post card component
│   │   │   ├── ShareButton/     # Share button component
│   │   │   └── Skeleton/        # Loading skeleton
│   │   ├── context/
│   │   │   └── ProtectRoute.jsx # Auth route guard
│   │   ├── pages/
│   │   │   ├── home/            # Landing page
│   │   │   ├── main/            # Blog listing
│   │   │   ├── blog/            # Blog detail view
│   │   │   ├── login/           # Login page
│   │   │   ├── signup/          # Signup page
│   │   │   ├── dashboard/       # User dashboard
│   │   │   ├── profile/         # User profile
│   │   │   ├── create/          # Create blog post
│   │   │   ├── edit/            # Edit blog post
│   │   │   ├── setting/         # User settings
│   │   │   └── notFound/        # 404 page
│   │   ├── App.jsx              # Route definitions
│   │   └── main.jsx             # App entry point
│   ├── Dockerfile
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
└── Readme.md
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description         | Auth |
| ------ | ------------------ | ------------------- | ---- |
| POST   | `/api/user/signup` | Register a new user | No   |
| POST   | `/api/user/signin` | Login & get JWT     | No   |

### Blog Posts

| Method | Endpoint                        | Description                 | Auth |
| ------ | ------------------------------- | --------------------------- | ---- |
| GET    | `/api/blogs/userPost`           | Get current user's posts    | Yes  |
| POST   | `/api/blogs/add`                | Create a new blog post      | Yes  |
| GET    | `/api/blogs/display/:slug`      | Get a post by slug (cached) | No   |
| GET    | `/api/blogs/view-for-edit/:slug`| Get post data for editing   | No   |
| PUT    | `/api/blogs/edit/:postId`       | Update a blog post          | Yes  |
| DELETE | `/api/blogs/delete/:postId`     | Delete a blog post          | Yes  |

### Comments

| Method | Endpoint                         | Description      | Auth |
| ------ | -------------------------------- | ---------------- | ---- |
| PUT    | `/api/comments/edit/:commentId`  | Edit a comment   | Yes  |
| DELETE | `/api/comments/delete/:commentId`| Delete a comment | Yes  |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local or Atlas)
- **Redis** (local or managed)
- **pnpm** (frontend) / **npm** (backend)

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
DB_URL=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret
AUTHORIZE_URL=http://localhost:5173
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
REDIS_SOCKET=localhost
REDIS_PORT=6379
```

### Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/SubhadipD9/codsoft-pro-blog-post-site.git
   cd codsoft-pro-blog-post-site
   ```

2. **Start the backend**

   ```bash
   cd backend
   npm install
   npm run dev        # starts with nodemon on port 3001
   ```

3. **Start the frontend** (in a new terminal)

   ```bash
   cd frontend
   pnpm install
   pnpm dev           # starts Vite dev server on port 5173
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run with Docker

```bash
cd backend
docker compose up --build
```

This starts the backend, MongoDB, and Redis in containers. The frontend can be run separately with `pnpm dev` or via its own Dockerfile.

## Deployment

Both the frontend and backend include `vercel.json` configuration files for deployment on **Vercel**:

- **Backend** — deployed as a serverless Node.js function
- **Frontend** — deployed as a static SPA with client-side routing rewrites

## License

ISC

## Author

Created by [Subhadip Bag](https://github.com/SubhadipD9)
