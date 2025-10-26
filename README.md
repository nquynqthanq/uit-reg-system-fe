<h1 style="text-align:center;">UIT Retrieve Regulation System</h2>
<p style="text-align:center;">
  <img src="/src/assets/svgs/logo.svg" alt="UIT Regulation" width="200" height="200" />
</p>

<p style="text-align: justify">
  <strong>UIT Retrieve Regulation System</strong> is a modern web application built with React, TypeScript, and Vite that allows students and staff of the <strong>University of Information Technology (UIT)</strong> to easily search and access university regulations and policies. It features a clean, responsive interface with multi-language support (EN/VI), dark/light themes, and a secure authentication system, providing a fast and user-friendly experience for academic information retrieval.
</p>

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS + MUI Theme
- **State Management**: React Context API + Custom Hooks
- **Internationalization**: Multi-language support (EN/VI)
- **Theme**: Dark/Light mode with custom theme context
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)

## ✨ Features

- 🔐 **Authentication System**: Complete auth flow with login/signup pages
- 💬 **Chat Interface**: Interactive chat system with message history
- 🌍 **Internationalization**: Multi-language support (English & Vietnamese)
- 🎨 **Theme Customization**: Dark/Light mode with persistent preferences
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- 🎯 **Type Safety**: Full TypeScript coverage for type-safe development
- 🔄 **State Management**: Context API for global state management
- 🛡️ **Error Handling**: Error boundaries for graceful error handling
- 🎭 **Custom Hooks**: Reusable hooks for common functionalities
- 📦 **Component Library**: Well-organized component structure with Material-UI

## 📁 Project Structure

```
uit-reg-system-fe/
├── public/                    # Static assets
│   └── logo.svg              # Application logo
├── src/
│   ├── assets/               # Static assets
│   ├── components/           # React components
│   ├── contexts/             # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── locales/              # Internationalization
│   ├── pages/                # Page components
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite type definitions
├── .env                      # Environment variables
├── .env.example              # Environment variables template
├── eslint.config.js          # ESLint configuration
├── commitlint.config.js      # Commitlint configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # TypeScript app configuration
├── tsconfig.node.json        # TypeScript node configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn >= 1.22.x

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd uit-reg-system-fe
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=UIT_REG_SYSTEM
```

> **Note**: Make sure the backend API is running before starting the frontend application.

## 🚀 Development

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Type check
npm run type-check
```

## 📝 Available Scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start development server     |
| `npm run build`        | Build for production         |
| `npm run preview`      | Preview production build     |
| `npm run lint`         | Run ESLint                   |
| `npm run lint:fix`     | Fix ESLint issues            |
| `npm run format`       | Format code with Prettier    |
| `npm run format:check` | Check code formatting        |
| `npm run type-check`   | Run TypeScript type checking |

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/amazing-feature`
2. Make your changes
3. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

UIT Development Team

## 📞 Support

For support, email nguyenqthangwork@gmail.com or create an issue in the repository.
