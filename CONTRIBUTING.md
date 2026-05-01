# Contributing to CriticalCyberSim

Thank you for your interest in contributing to CriticalCyberSim! This platform aims to protect U.S. critical infrastructure through comprehensive cybersecurity training.

## 📋 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Prioritize security in all contributions
- Follow federal compliance guidelines (NIST, CISA)

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8.0+
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/critical-cybersim-platform.git
   cd critical-cybersim-platform
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Configure environment**
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

4. **Setup database**
   ```bash
   # Create database: criticalcybersim
   php artisan migrate --seed
   ```

5. **Build frontend**
   ```bash
   npm run dev
   ```

## 🔧 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# OR
git checkout -b fix/bug-description
```

### 2. Make Your Changes

**Follow these standards:**

#### PHP/Laravel Code
- ✅ Follow PSR-12 coding standards
- ✅ Run Laravel Pint before committing: `vendor/bin/pint`
- ✅ Write PHPUnit tests for new features
- ✅ Use type hints and return types
- ✅ Add PHPDoc blocks for complex methods
- ✅ Follow Laravel best practices (see AGENTS.md)

#### TypeScript/React Code
- ✅ Follow ESLint rules: `npm run lint`
- ✅ Format with Prettier: `npm run format`
- ✅ Use TypeScript strict mode
- ✅ Write functional components with hooks
- ✅ Follow React best practices

#### Database
- ✅ Create migrations for schema changes
- ✅ Never modify existing migrations (create new ones)
- ✅ Add seeders for test data
- ✅ Document database changes in migration comments

### 3. Test Your Changes

```bash
# Run PHP tests
php artisan test

# Run specific test
php artisan test --filter=YourTestName

# Run with coverage
php artisan test --coverage

# Check code style
vendor/bin/pint --test

# Build frontend
npm run build

# Lint JavaScript/TypeScript
npm run lint
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
# Format: <type>(<scope>): <subject>

# Examples:
git commit -m "feat(admin): add bulk user import functionality"
git commit -m "fix(auth): resolve session timeout issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(services): optimize simulation scoring algorithm"
git commit -m "test(modules): add unit tests for ModuleController"
```

**Commit types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `security`: Security improvements

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Reference to related issues (if any)
- Screenshots for UI changes
- Test results

## 🧪 Testing Guidelines

### PHP Tests
- Write unit tests for models and services
- Write feature tests for controllers and routes
- Aim for 80%+ code coverage
- Use factories for test data
- Mock external services

Example:
```php
public function test_admin_can_create_module(): void
{
    $admin = User::factory()->create(['role' => 'admin']);
    
    $response = $this->actingAs($admin)->post('/admin/modules', [
        'title' => 'Test Module',
        'difficulty_level' => 'intermediate',
        // ... other fields
    ]);
    
    $response->assertRedirect('/admin/modules');
    $this->assertDatabaseHas('simulation_modules', [
        'title' => 'Test Module',
    ]);
}
```

### Frontend Tests
- Test component rendering
- Test user interactions
- Test API calls
- Use React Testing Library

## 🔒 Security Guidelines

### Never Commit:
- ❌ `.env` files
- ❌ API keys or secrets
- ❌ Database passwords
- ❌ Private keys
- ❌ User data

### Always:
- ✅ Use environment variables for secrets
- ✅ Validate and sanitize all user input
- ✅ Use parameterized queries (Eloquent ORM)
- ✅ Implement CSRF protection
- ✅ Check authorization before actions
- ✅ Log security-relevant events

### Report Security Vulnerabilities
**DO NOT create public issues for security vulnerabilities.**

Email: admin@criticalcybersim.com with:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## 📝 Documentation

### Update Documentation When:
- Adding new features
- Changing APIs
- Modifying configuration
- Updating dependencies

### Documentation Files:
- `README.md` - Overview and installation
- `SECURITY.md` - Security policy
- `AGENTS.md` - Laravel Boost guidelines
- Code comments - Complex logic explanation

## 🎯 What We're Looking For

### High Priority Contributions:
- 🔒 Security improvements
- 🐛 Bug fixes
- 📚 Documentation improvements
- ✅ Test coverage increases
- ♿ Accessibility improvements
- 🌐 Internationalization (i18n)

### Feature Contributions:
- New training scenarios
- Additional NIST control family coverage
- Analytics dashboard enhancements
- Gamification features
- API improvements
- Performance optimizations

## 🔍 Pull Request Review Process

1. **Automated checks run** (tests, linting, build)
2. **Code review by maintainers**
3. **Security review** (if applicable)
4. **Documentation review**
5. **Approval and merge**

### PR Review Checklist:
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] New tests added (if applicable)
- [ ] Documentation updated
- [ ] No security vulnerabilities introduced
- [ ] Breaking changes documented
- [ ] Commits follow conventional format

## ❓ Questions?

- Open a GitHub Discussion for general questions
- Create an issue for bug reports or feature requests
- Email admin@criticalcybersim.com for security concerns

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to critical infrastructure cybersecurity! 🛡️
