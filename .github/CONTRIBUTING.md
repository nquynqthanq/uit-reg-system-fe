# Contributing to UIT Retrieve Regulation System (Frontend)

Thank you for your interest in contributing to the UIT Retrieve Regulation System Frontend! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/uit-reg-system-fe.git
cd uit-reg-system-fe
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/uit-reg-system-fe.git
```

4. Install dependencies:

```bash
npm install
```

5. Create environment file:

```bash
cp .env.example .env
```

6. Start development server:

```bash
npm run dev
```

## 💻 Development Workflow

### Creating a Branch

1. Update your local main branch:

```bash
git checkout main
git pull upstream main
```

2. Create a feature branch:

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Making Changes

1. Make your changes in the feature branch
2. Follow the [Coding Standards](#coding-standards)
3. Test your changes thoroughly
4. Commit your changes following the [Commit Messages](#commit-messages) guidelines

### Testing Your Changes

Before submitting a PR, make sure to:

- Run linting: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Format code: `npm run format`
- Check formatting: `npm run format:check`
- Type check: `npm run type-check`
- Build the project: `npm run build`
- Test in development: `npm run dev`

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference when possible

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names (PascalCase)
- Extract reusable logic into custom hooks
- Use prop destructuring
- Define PropTypes or TypeScript interfaces for props

### File Naming

- Components: `PascalCase.tsx` (e.g., `ChatInput.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- Utilities: `camelCase.ts` (e.g., `validation.ts`)
- Types: `camelCase.ts` (e.g., `auth.ts`)
- Constants: `PascalCase.ts` (e.g., `AuthenticationConstant.ts`)

### Code Style

- Follow ESLint and Prettier configurations
- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Maximum line length: 100 characters
- Add comments for complex logic

### CSS/Styling

- Use Material-UI theming
- Follow BEM naming convention for custom CSS
- Use CSS modules or styled-components when needed
- Ensure responsive design (mobile-first)
- Test in both light and dark themes

### Internationalization

- Add translations for both English and Vietnamese
- Use translation keys in format: `section.feature.text`
- Keep translation files synchronized

## 📋 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(auth): add password reset functionality

fix(chat): resolve message scrolling issue

docs(readme): update installation instructions

style(components): format code with prettier

refactor(hooks): simplify useLocalStorage implementation

perf(chat): optimize message rendering

chore(deps): update dependencies
```

### Scope

Use one of the following scopes:

- `auth`: Authentication related
- `chat`: Chat interface
- `components`: React components
- `hooks`: Custom hooks
- `utils`: Utility functions
- `types`: TypeScript types
- `i18n`: Internationalization
- `theme`: Theme and styling
- `api`: API integration
- `config`: Configuration files
- `deps`: Dependencies

## 🔄 Pull Request Process

### Before Submitting

1. Update your branch with the latest main:

```bash
git checkout main
git pull upstream main
git checkout your-feature-branch
git rebase main
```

2. Ensure all checks pass:
   - ✅ Linting passes
   - ✅ Type checking passes
   - ✅ Build succeeds
   - ✅ Code is formatted
   - ✅ All tests pass (if applicable)

3. Update documentation if needed

### Submitting a Pull Request

1. Push your branch to your fork:

```bash
git push origin your-feature-branch
```

2. Open a Pull Request on GitHub
3. Fill out the PR template completely
4. Link related issues
5. Request review from maintainers
6. Respond to review comments

### PR Requirements

- Clear description of changes
- Screenshots for UI changes
- Testing steps documented
- No merge conflicts
- All CI checks passing
- At least one approving review

### After PR is Merged

1. Delete your feature branch:

```bash
git branch -d your-feature-branch
git push origin --delete your-feature-branch
```

2. Update your local main:

```bash
git checkout main
git pull upstream main
```

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues to avoid duplicates
- Verify the bug in the latest version
- Collect relevant information

### Bug Report Template

Use the bug report issue template and include:

- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos
- Environment details (OS, browser, versions)
- Console errors
- Network errors (if applicable)

## 💡 Suggesting Features

### Feature Request Template

Use the feature request issue template and include:

- Problem description
- Proposed solution
- Alternative solutions considered
- Related modules
- Priority level
- Additional context (mockups, examples)

## 🎯 Development Tips

### Hot Reloading

The development server supports hot module replacement (HMR). Changes to React components will be reflected immediately.

### Debugging

- Use React Developer Tools browser extension
- Use browser DevTools for debugging
- Check console for errors and warnings
- Use TypeScript error messages

### Performance

- Use React DevTools Profiler
- Lazy load components when appropriate
- Optimize images and assets
- Minimize bundle size

## 📞 Getting Help

- Create an issue for questions
- Email: nguyenqthangwork@gmail.com
- Review existing documentation

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!
