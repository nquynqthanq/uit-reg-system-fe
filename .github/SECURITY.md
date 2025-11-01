# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## 🐛 Reporting a Vulnerability

We take the security of UIT Retrieve Regulation System seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue
- Discuss the vulnerability in public forums, social media, or chat rooms
- Exploit the vulnerability beyond what is necessary to demonstrate it

### Please DO:

1. **Email us directly** at: nguyenqthangwork@gmail.com
2. **Include the following information**:
   - Type of vulnerability (e.g., XSS, CSRF, injection, etc.)
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability
   - Potential mitigation or fix suggestions

### What to Expect:

- **Initial Response**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Assessment**: We will investigate and assess the vulnerability
- **Updates**: We will keep you informed about the progress
- **Resolution**: We will work on a fix and notify you when it's ready
- **Disclosure**: We will coordinate with you on the disclosure timeline

## 🛡️ Security Best Practices

### For Developers

When contributing to this project:

1. **Never commit sensitive data**:
   - API keys
   - Passwords
   - Tokens
   - Private keys
   - Environment variables with sensitive data

2. **Use environment variables**:
   - Store configuration in `.env` files
   - Never commit `.env` files to version control
   - Use `.env.example` for templates

3. **Validate user input**:
   - Sanitize all user inputs
   - Use proper validation for forms
   - Escape output to prevent XSS

4. **Keep dependencies updated**:
   - Regularly update npm packages
   - Monitor security advisories
   - Use `npm audit` to check for vulnerabilities

5. **Follow secure coding practices**:
   - Use HTTPS for API calls
   - Implement proper authentication and authorization
   - Use Content Security Policy (CSP)
   - Implement rate limiting on client side

### For Users

1. **Keep your software updated**:
   - Use the latest version of the application
   - Keep your browser updated
   - Update Node.js and npm regularly

2. **Use strong passwords**:
   - Use unique, complex passwords
   - Enable two-factor authentication (when available)

3. **Be cautious**:
   - Don't share your credentials
   - Log out after using shared computers
   - Report suspicious activity

## 🔐 Security Features

This application implements the following security measures:

### Frontend Security

- **Input Validation**: Client-side validation for all user inputs
- **XSS Protection**: React's built-in XSS protection through JSX escaping
- **HTTPS**: Enforced HTTPS connections in production
- **Content Security Policy**: CSP headers to prevent XSS attacks
- **Secure Storage**: Local storage encryption for sensitive data
- **Authentication**: Secure token-based authentication
- **CORS**: Proper CORS configuration for API requests

### Dependencies

- Regular dependency updates via Dependabot
- Security audits with `npm audit`
- Automated vulnerability scanning in CI/CD

## 📋 Security Checklist for Contributors

Before submitting a PR, ensure:

- [ ] No sensitive data in code or commits
- [ ] No hardcoded credentials or API keys
- [ ] All user inputs are validated and sanitized
- [ ] No new `npm audit` vulnerabilities introduced
- [ ] Environment variables used for configuration
- [ ] Proper error handling (no sensitive info in error messages)
- [ ] HTTPS used for all external API calls
- [ ] Authentication state properly managed
- [ ] No console.log statements with sensitive data

## 🔍 Known Security Considerations

### Local Storage

We use local storage for:

- User preferences (theme, language)
- Authentication tokens (encrypted)
- Chat history (non-sensitive data)

**Note**: Local storage is accessible via JavaScript. Never store highly sensitive data in local storage.

### Third-Party Dependencies

We regularly monitor and update:

- React and React DOM
- Material-UI components
- Axios (HTTP client)
- Other npm packages

### API Communication

- All API calls use HTTPS in production
- Authentication tokens are included in request headers
- Timeout configured to prevent hanging requests
- Proper error handling for failed requests

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/security)
- [NPM Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [Web Security Guidelines](https://developer.mozilla.org/en-US/docs/Web/Security)

## 📞 Contact

For security-related inquiries:

- Email: nguyenqthangwork@gmail.com
- Please use "SECURITY" in the subject line

## 🙏 Acknowledgments

We appreciate the security research community and responsible disclosure of vulnerabilities. Contributors who report valid security issues will be acknowledged (with permission) in our release notes.

---

**Last Updated**: October 2025
