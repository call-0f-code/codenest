# CodeNest

**CodeNest** is a comprehensive member management and collaboration platform built for the **Call of Code (CoC) club**. This application helps club members track their progress, share interview experiences, manage DSA topics, and build their professional profiles.

## 🎯 Features

- **User Profiles**: Build and showcase professional profiles
- **Interview Experiences**: Share and browse interview experiences
- **DSA Dashboard**: Track Data Structures and Algorithms progress
- **Progress Tracking**: Monitor individual learning progress
- **Topic Management**: Organize and track various CS topics

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Query** - Data fetching
- **React Hot Toast** - Notifications
- **Radix UI** - Component primitives

### Backend
- **Bun** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Bun](https://bun.sh) (v1.2.18 or higher)
- Node.js (v18 or higher)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/call-0f-code/codenest.git
cd codenest
```

### 2. Install Dependencies

Install all dependencies (root, backend, and frontend):

```bash
bun run install:all
```

Or install them separately:

```bash
# Install root dependencies
bun install

# Install backend dependencies
bun run install:backend

# Install frontend dependencies
bun run install:frontend
```

### 3. Environment Setup

#### Backend
Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration.

#### Frontend
Create a `.env` file in the `frontend` directory if needed:

```bash
cd frontend
cp .env.example .env
```

### 4. Run the Application

#### Development Mode

Run both frontend and backend concurrently:

```bash
bun run dev
```

Or run them separately:

```bash
# Run backend only
bun run backend-dev

# Run frontend only
bun run frontend-dev
```

#### Access the Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000 (or as configured)

## 📁 Project Structure

```
codenest/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── validation/     # Input validation
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   ├── tests/              # Backend tests
│   └── package.json
├── frontend/               # Frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Libraries
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main App component
│   └── package.json
└── package.json           # Root package.json
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
bun test
```

### Frontend Tests

```bash
cd frontend
bun test
```

## 🔧 Development

### Linting

#### Backend

```bash
cd backend
bun run lint
bun run lint:fix  # Auto-fix issues
```

#### Frontend

```bash
cd frontend
bun run lint
```

### Code Formatting

```bash
cd backend
bun run format
```

## 🏗️ Building for Production

### Frontend Build

```bash
cd frontend
bun run build
```

### Preview Production Build

```bash
cd frontend
bun run preview
```

## 📝 API Documentation

The backend API is available at `/api/v1` with the following endpoints:

- **Members**: User and member management
- **Interview**: Interview experience sharing
- **Progress**: Progress tracking
- **Topics**: Topic management

A health check endpoint is available at `/health`.

## 🤝 Contributing

This is a private repository for Call of Code club members. If you're a member and want to contribute:

1. Create a feature branch
2. Make your changes
3. Test your changes thoroughly
4. Submit a pull request

## 📧 Support

For questions or issues, please contact the Call of Code club administrators or create an issue in the repository.

## 📄 License

This project is private and intended for use by Call of Code club members only.

---

Built with ❤️ by the Call of Code community
