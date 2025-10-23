# UITRegSystem Frontend

Modern React + TypeScript frontend application built with Vite, featuring a comprehensive development setup with best practices.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS + MUI Theme
- **State Management**: React Hooks (custom hooks included)
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable React components
│   │   ├── shared/          # Shared components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   └── HistorySidebar.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useWindowSize.ts
│   │   ├── useDebounce.ts
│   │   ├── useTheme.ts
│   │   └── usePrevious.ts
│   ├── pages/                # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── NotFound.tsx
│   ├── utils/                # Utility functions
│   │   ├── env.ts           # Environment variables
│   │   ├── string.ts        # String utilities
│   │   ├── date.ts          # Date utilities
│   │   ├── storage.ts       # Storage utilities
│   │   └── validation.ts    # Validation utilities
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── .env.example              # Environment variables template
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── commitlint.config.js      # Commitlint configuration
├── tsconfig.json             # TypeScript configuration
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
cd frontend
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
VITE_APP_NAME=UITRegSystem
```

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

## 🎯 Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import Component from "@/components/Component";
import { useCustomHook } from "@hooks";
import { formatDate } from "@utils";
import HomePage from "@pages/Home";
```

Available aliases:

- `@/` → `./src/`
- `@components/` → `./src/components/`
- `@pages/` → `./src/pages/`
- `@assets/` → `./src/assets/`
- `@utils/` → `./src/utils/`
- `@hooks/` → `./src/hooks/`

## 🔒 Git Hooks

This project uses Husky for Git hooks:

### Pre-commit

- Runs lint-staged to lint and format staged files
- Ensures code quality before commits

### Commit Message

- Validates commit messages using commitlint
- Follows Conventional Commits specification

### Commit Message Format

```
type(scope?): subject

body?

footer?
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

**Examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button issue"
git commit -m "docs: update README with setup instructions"
```

## 🧩 Custom Hooks

### useLocalStorage

```typescript
const [value, setValue, removeValue] = useLocalStorage("key", initialValue);
```

### useWindowSize

```typescript
const { width, height } = useWindowSize();
```

### useDebounce

```typescript
const debouncedValue = useDebounce(value, 500);
```

### useTheme

```typescript
const [theme, setTheme] = useTheme("system");
```

## 🛠️ Utilities

### Environment Variables

```typescript
import { env } from "@utils";
console.log(env.apiBaseUrl);
```

### String Utilities

```typescript
import { capitalize, truncate, kebabCase } from "@utils";
```

### Date Utilities

```typescript
import { formatDate, getRelativeTime } from "@utils";
```

### Storage Utilities

```typescript
import { storage, sessionStorage } from "@utils";
storage.set("key", value);
const data = storage.get("key");
```

### Validation Utilities

```typescript
import { isValidEmail, isStrongPassword } from "@utils";
```

## 🚨 Error Handling

The app includes a global ErrorBoundary component that catches and displays errors gracefully:

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 🔧 Configuration Files

- **vite.config.ts**: Vite configuration with path aliases
- **tsconfig.json**: TypeScript configuration
- **eslint.config.js**: ESLint rules
- **.prettierrc**: Prettier formatting rules
- **commitlint.config.js**: Commit message validation

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

UITRegSystem Development Team

## 📞 Support

For support, email support@uitregsystem.com or create an issue in the repository.
