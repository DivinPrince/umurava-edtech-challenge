# 🎓 Umurava EdTech Platform

A comprehensive educational technology platform featuring a Next.js frontend and Node.js backend.

## 🌟 Overview

Umurava EdTech is a full-stack educational platform

## 🏗️ Project Structure

```
umurava-edtech/
├── frontend/    # Next.js 15 web application
└── backend/     # Node.js/TypeScript API service
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- pnpm (recommended) or npm
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/DivinPrince/umurava-edtech-challenge.git
cd umurava-edtech-challenge
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your configurations:
# - MongoDB connection string
# - Better Auth configuration
#   - AUTH_SECRET_KEY
#   - AUTH_REFRESH_SECRET
#   - AUTH_ACCESS_TOKEN_EXPIRY
#   - AUTH_REFRESH_TOKEN_EXPIRY
# - Other environment variables

# Initialize database
pnpm db:generate-dev
pnpm db:push-dev

# Create admin user
pnpm db:create-admin

# Start development server
pnpm dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your configurations:
# - API URL
# - Better Auth client configuration
# - Other environment variables

# Start development server
pnpm dev
```

The frontend will run on `http://localhost:3000`

## 🔧 Available Scripts

### Backend

```bash
pnpm dev              # Start development server
pnpm db:generate-dev  # Generate Prisma client
pnpm db:migrate-dev   # Run database migrations
pnpm db:push-dev      # Push schema changes
pnpm db:studio-dev    # Open Prisma Studio
pnpm db:create-admin  # Create admin user
pnpm db:seed-dev      # Seed database with initial challenges data
```


### Frontend

```bash
pnpm dev    # Start development server
pnpm build  # Create production build
pnpm start  # Start production server
```

## 📚 Documentation

- Backend API documentation is available in `backend/api.docs.md`
- Frontend component documentation is available in Storybook
- Better Auth documentation at [better-auth.com/docs](https://www.better-auth.com/docs/introduction)

## 🔒 Security Features

Better Auth provides comprehensive authentication and authorization features:
- Framework-agnostic authentication system
- email & password authentication
- session management
- Role-based access control

## 💻 Tech Stack

### Backend
- Node.js with TypeScript
- MongoDB with Prisma ORM
- Express.js
- Better Auth Authentication [better-auth.com](https://www.better-auth.com/)
- Middleware system

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI Components
- Redux Toolkit
- Better Auth Client Authentication (from the backend)
- React Hook Form + Zod


## 👥 Authors

- Irasubiza Divin Prince - Backend Developer - [Github](https://github.com/divinprince)
- Irankunda Patient - Frontend Developer - [Github](https://github.com/ipcode-cloud)
- Akimana Africa Arsene - Frontend Developer - [Github](https://github.com/AKIMANAAFRICAARSENE)