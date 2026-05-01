# Security Policy

## 🔒 Security Commitment

CriticalCyberSim takes security seriously. This platform is designed to train cybersecurity professionals and protect critical infrastructure, so we implement industry-standard security practices.

## 🛡️ Security Standards Implemented

### 1. **Authentication & Authorization**
- ✅ Laravel Sanctum session-based authentication
- ✅ Role-based access control (RBAC) with middleware
- ✅ Password hashing with bcrypt (configurable rounds)
- ✅ CSRF protection on all forms
- ✅ Email verification required
- ✅ Secure password reset flows

### 2. **Data Protection**
- ✅ Environment variables stored in `.env` (never committed)
- ✅ Database credentials in environment only
- ✅ API keys and secrets in environment only
- ✅ Encrypted session storage option
- ✅ Database connection encryption support
- ✅ Activity logging for audit trails

### 3. **Input Validation & Sanitization**
- ✅ Laravel Form Requests for validation
- ✅ Mass assignment protection with `$fillable`
- ✅ SQL injection prevention via Eloquent ORM
- ✅ XSS prevention with React's automatic escaping
- ✅ CSRF token validation on all POST/PUT/DELETE requests

### 4. **Configuration Security**
- ✅ Debug mode disabled in production (`APP_DEBUG=false`)
- ✅ Secure session configuration
- ✅ HTTPS enforced in production
- ✅ Secure cookie settings
- ✅ CORS properly configured

### 5. **Code Security**
- ✅ Dependencies regularly updated
- ✅ No hardcoded credentials in code
- ✅ Sensitive files excluded via `.gitignore`
- ✅ TypeScript for type safety
- ✅ ESLint security rules enabled

## 📝 Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **DO NOT** open a public GitHub issue
2. Email security details to: **admin@criticalcybersim.com**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if applicable)

### Response Timeline
- **24 hours**: Initial acknowledgment
- **72 hours**: Preliminary assessment
- **7 days**: Detailed response and timeline for fix
- **30 days**: Fix implemented and deployed

## ✅ Security Checklist for Deployment

### Before Deploying to Production

- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Generate new `APP_KEY` with `php artisan key:generate`
- [ ] Set strong database password
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set secure session settings:
  ```env
  SESSION_SECURE_COOKIE=true
  SESSION_HTTP_ONLY=true
  SESSION_SAME_SITE=strict
  ```
- [ ] Set proper file permissions (755 for directories, 644 for files)
- [ ] Disable directory listing
- [ ] Configure rate limiting
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Set up monitoring and alerting
- [ ] Review logs regularly
- [ ] Keep dependencies updated

### Environment Variables to Change

**MUST CHANGE:**
```env
APP_KEY=                           # Generate with: php artisan key:generate
DB_PASSWORD=                       # Set strong database password
MAIL_PASSWORD=                     # Set mail server password (if using)
```

**RECOMMENDED TO CHANGE:**
```env
DB_DATABASE=                       # Use production database name
DB_USERNAME=                       # Use non-root database user
APP_URL=                          # Set to production domain
SESSION_DOMAIN=                   # Set to production domain
```

## 🔐 Password Requirements

### User Passwords
- Minimum 8 characters (configurable)
- Must include uppercase, lowercase, and numbers (configurable)
- Password reset token expires in 60 minutes
- Password confirmation required for sensitive actions

### Database Passwords
- Minimum 16 characters
- Include special characters
- Rotate regularly (quarterly recommended)

## 📊 Security Audit Log

All sensitive actions are logged via Spatie Activity Log:
- User authentication (login/logout)
- Role changes
- Permission modifications
- Module/scenario creation/deletion
- User data modifications

View logs: `SELECT * FROM activity_log ORDER BY created_at DESC;`

## 🚨 Known Security Considerations

### Development vs Production

**Development (.env example):**
- `APP_DEBUG=true` - Shows detailed errors
- `DB_PASSWORD=` - Empty password for local dev
- HTTP allowed

**Production (MUST configure):**
- `APP_DEBUG=false` - Never show stack traces
- Strong database password
- HTTPS only
- Secure cookies enabled

## 🔄 Security Update Policy

- **Critical vulnerabilities**: Patched within 24 hours
- **High severity**: Patched within 7 days
- **Medium severity**: Patched within 30 days
- **Low severity**: Included in next release

## 📚 Security Resources

### Compliance Frameworks
- NIST SP 800-53 Rev. 5
- NIST Cybersecurity Framework
- OMB M-22-09 (Zero Trust)
- CISA Framework
- EO 14028 (Cybersecurity)

### Laravel Security
- [Laravel Security Best Practices](https://laravel.com/docs/12.x/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Laravel Security Checklist](https://github.com/Lisennk/Laravel-Security-Checklist)

## 📞 Contact

- **Security Issues**: admin@criticalcybersim.com
- **General Support**: support@criticalcybersim.com
- **GitHub**: https://github.com/criticalcybersim/critical-cybersim-platform

---

**Last Updated**: May 1, 2026  
**Version**: 1.0.0
