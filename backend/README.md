# Umurava EdTech Backend

A backend API service for an educational technology platform

## 📋 Prerequisites

- Node.js (v14 or higher)
- TypeScript
- MongoDB
- pnpm (recommended) or npm/yarn
- Prisma CLI

## 🛠️ Installation

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file (`.env.local`) in the root directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development
BASE_PATH=/api
APP_ORIGIN=http://localhost:3000

# Database
DATABASE_URL="mongodb://localhost:27017/umurava_edtech"
```

4. Initialize Prisma:
```bash
pnpm db:generate-dev  # Generate Prisma Client
pnpm db:push-dev      # Push schema to database
```
5. Create admin user:
```bash
pnpm db:create-admin
```

5. Start the development server:
```bash
pnpm dev
```

## 🏗️ Project Structure

```
src/
├── config/         # Configuration files
├── enums/          # Enumeration types
├── lib/            # Core libraries and utilities
│   ├── db.ts      # Database configuration
│   ├── auth.ts    # Authentication utilities
│   └── utils/     # Utility functions
├── middlewares/   # Express middlewares
│   ├── auth-handler.ts
│   ├── error-handler.ts
│   ├── logging-handler.ts
│   ├── validation.ts
│   └── async-handler.ts
├── modules/       # Feature modules
│   ├── challenge/
│   ├── auth/
│   └── [other modules]/
└── app.ts         # Main application entry

prisma/
└── schema.prisma  # Database schema definition
```

## 💾 Database Models

### Challenge
- Complete challenge management with:
  - Unique slug identifier
  - Title and description
  - Deadline and duration
  - Prize information
  - Project brief and requirements
  - Required skills and seniority levels
  - Deliverables specification

### Submission
- User challenge submissions tracking:
  - Content storage
  - Status management (PENDING/APPROVED/REJECTED)
  - Feedback system
  - Unique constraint per user per challenge

### User
- Comprehensive user profile:
  - Basic info (name, email, image)
  - Skills array
  - Role-based access
  - Ban management system
  - Email verification status

### Session
- Advanced session management:
  - Token-based authentication
  - IP address tracking
  - User agent logging
  - Impersonation support for admin functions

### Account
- Multi-provider authentication:
  - OAuth provider integration
  - Access and refresh token management
  - Password authentication support
  - Token expiration handling

## 🔧 Available Scripts

```bash
pnpm dev              # Start development server with hot reload
pnpm db:generate-dev  # Generate Prisma client
pnpm db:migrate-dev   # Run database migrations
pnpm db:push-dev      # Push schema changes to database
pnpm db:studio-dev    # Open Prisma Studio
pnpm db:create-admin  # Create admin user
```

## 🔒 Authentication

The API implements a comprehensive authentication system:
- JWT-based authentication
- Session management with IP tracking
- Multi-provider OAuth support
- Role-based access control
- Admin impersonation capabilities

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## 🚀 Development Workflow

1. Create feature branch from `main`
2. Implement changes following the modular architecture
3. Ensure proper error handling and validation
4. Update API documentation if needed
5. Submit pull request with descriptive title
6. Ensure all environment variables are documented

## 📝 API Documentation

Refer to `api.docs.md` for detailed API documentation including:
- Available endpoints
- Request/Response formats
- Authentication requirements
- Error codes and handling
- Better Auth integration details

## 👥 Authors

- Irasubiza Divin Prince - Initial work - [Github](https://github.com/divinprince)