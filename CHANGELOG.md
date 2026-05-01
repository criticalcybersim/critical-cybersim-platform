# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Improved repository security measures
- GitHub issue templates for bugs and feature requests
- Pull request template with comprehensive checklist
- CONTRIBUTING.md guide for contributors
- CODEOWNERS file for automatic review assignments
- Enhanced CI/CD workflows with security scanning
- CodeQL security analysis workflow
- Dependency vulnerability scanning
- Secret scanning with TruffleHog
- MIT License
- Enhanced .env.example with security comments

### Changed
- Updated test workflow to use MySQL service
- Added Composer and NPM dependency caching
- Improved test coverage requirements (80% minimum)
- Enhanced .gitignore with additional patterns

### Security
- Added security scanning workflow
- Enabled branch protection recommendations
- Added security policy documentation
- Improved environment configuration security

## [1.0.0] - 2026-05-01

### Added
- Initial release of CriticalCyberSim platform
- Comprehensive cybersecurity training for U.S. critical infrastructure
- 16 CISA-designated critical infrastructure sectors
- Admin module management system with full CRUD operations
- User learning dashboard with progress tracking
- Role-based access control (admin, super_admin, trainee)
- Gamification system with achievements and leaderboards
- Training scenarios with multiple choice questions
- Session management and scoring system
- Analytics and reporting dashboard
- Responsive React 19 + TypeScript frontend with Inertia.js v2
- Laravel 12 backend with MySQL database
- NIST SP 800-53 compliance framework
- Zero Trust Architecture (OMB M-22-09) alignment
- CISA cybersecurity framework integration
- Activity logging with Spatie Activity Log
- Comprehensive testing suite with PHPUnit
- Code quality tools (Laravel Pint, ESLint, Prettier)
- Development documentation and guides

### Security
- Environment variables properly configured
- CSRF protection enabled
- Password hashing with bcrypt
- Input validation and sanitization
- Secure session management
- Activity logging for audit trails
- Security policy documentation

### Documentation
- Comprehensive README with installation instructions
- Security policy (SECURITY.md)
- API documentation
- Development guidelines (AGENTS.md)
- QA testing guides

---

## Version History

### Version Numbering
- **Major version (X.0.0)**: Incompatible API changes
- **Minor version (0.X.0)**: New functionality (backwards compatible)
- **Patch version (0.0.X)**: Bug fixes (backwards compatible)

### Release Cycle
- **Major releases**: As needed for breaking changes
- **Minor releases**: Monthly (new features)
- **Patch releases**: Weekly or as needed (bug fixes and security)

### Support Policy
- **Current version (1.x)**: Full support
- **Previous major version**: Security updates only for 6 months
- **Older versions**: No support

### Reporting Issues
- Security vulnerabilities: admin@criticalcybersim.com
- Bugs: Create issue on GitHub
- Feature requests: Create issue on GitHub

---

## [1.0.0] - 2026-05-01

Initial production release for USCIS EB2 NIW demonstration.

**Project Goal**: Demonstrate exceptional ability in cybersecurity education and contribution to U.S. national interest through critical infrastructure protection.

**Key Achievements**:
- ✅ Production-ready cybersecurity training platform
- ✅ Federal compliance (NIST, CISA, OMB)
- ✅ Comprehensive security implementation
- ✅ Professional code quality and documentation
- ✅ Scalable architecture for national deployment

---

[Unreleased]: https://github.com/criticalcybersim/critical-cybersim-platform/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/criticalcybersim/critical-cybersim-platform/releases/tag/v1.0.0
