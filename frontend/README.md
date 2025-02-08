# Umurava EdTech Platform

A modern educational technology platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Redux Toolkit
- **Authentication:** Better Auth
  - Framework-agnostic auth system
  - Built-in email & password auth
  - Session management
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Better Fetch
- **Icons:** Lucide React


## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
```


3. Copy the example environment file:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your configuration:
```env
# App Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Better Auth Configuration
NEXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
```

### Development

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## 📁 Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── types/        # TypeScript type definitions
└── middleware.ts # Next.js middleware for auth and routing
```

## 🧪 Development Tools

- ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling
- Next.js development server with Turbopack
