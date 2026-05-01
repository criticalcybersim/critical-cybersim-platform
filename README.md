# CriticalCyberSim 🛡️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Inertia.js](https://img.shields.io/badge/Inertia.js-v2-9553E9)

## 🎯 Mission

**CriticalCyberSim** is a comprehensive nationwide cybersecurity training and simulation platform designed to protect U.S. critical infrastructure. Built for federal agencies, state/local governments, and critical infrastructure operators, it provides hands-on training based on NIST SP 800-53 Rev.5, Zero Trust Architecture (OMB M-22-09), and CISA frameworks.

## ✨ Key Features

- 🎮 **Realistic Simulations** - Hands-on cybersecurity scenarios across 16 CISA-designated critical infrastructure sectors
- 🧠 **Adaptive Learning** - Personalized training paths based on user performance and sector
- 📊 **Comprehensive Analytics** - Track skills across NIST control families with detailed progress reports
- 🏆 **Gamification** - Points, achievements, streaks, and leaderboards to motivate continuous learning
- 🔒 **Role-Based Access Control** - Admin, Manager, Analyst, and Trainee roles with Spatie Permission
- 📝 **Activity Logging** - Complete audit trail with Spatie Activity Log
- 🎯 **Federal Compliance** - NIST SP 800-53, OMB M-22-09, EO 14028, CISA Framework

## 🏗️ Tech Stack

### Backend
- **Framework**: Laravel 12.x (PHP 8.2)
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Sanctum
- **Permissions**: Spatie Laravel-Permission v6.25
- **Audit Log**: Spatie Laravel-Activity-Log v4.12
- **Testing**: PHPUnit 11

### Frontend
- **Framework**: React 19.x with TypeScript
- **Routing**: Inertia.js v2
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: Zustand (client state), TanStack Query (server state)
- **Charts**: Recharts
- **Animations**: Framer Motion

### Development Tools
- **PHP Formatter**: Laravel Pint v1
- **JS/TS Linter**: ESLint v9
- **JS/TS Formatter**: Prettier v3
- **Dev Environment**: Laravel Sail (Docker)

## 📋 Architecture

### Service Layer Pattern
```
Controllers → Services → Models → Database
```

**Core Services:**
- `SimulationEngineService` - Session management, decision processing, scoring
- `GamificationService` - Points, achievements, streaks, leaderboards
- `AdaptiveLearningService` - Personalized recommendations, strength/weakness analysis
- `AnalyticsService` - User/organization analytics, progress tracking

### Database Schema
- **Sectors** (16 CISA critical infrastructure sectors)
- **Organizations** (Federal agencies, state/local gov, private sector)
- **Users** (with gamification: points, level, streak)
- **Simulation Modules** (training content by sector)
- **Training Scenarios** (individual challenges within modules)
- **Simulation Sessions** (user attempts with scoring)
- **User Progress** (module completion tracking)
- **NIST Controls** (SP 800-53 control families)
- **Achievements** (20 gamification achievements)
- **User Achievements** (earned achievements pivot)

### 16 Critical Infrastructure Sectors
1. Chemical
2. Commercial Facilities
3. Communications
4. Critical Manufacturing
5. Dams
6. Defense Industrial Base
7. Emergency Services
8. Energy
9. Financial Services
10. Food and Agriculture
11. Government Facilities
12. Healthcare and Public Health
13. Information Technology
14. Nuclear Reactors, Materials, and Waste
15. Transportation Systems
16. Water and Wastewater Systems

## 🚀 Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8.0+
- Git

### Setup Instructions

1. **Clone Repository**
```bash
git clone <repository-url>
cd critical-cybersim-platform
```

2. **Install Dependencies**
```bash
composer install
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Database Configuration**

Edit `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=criticalcybersim
DB_USERNAME=root
DB_PASSWORD=
```

Create database:
```bash
mysql -u root -p -e "CREATE DATABASE criticalcybersim CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

5. **Run Migrations & Seeders**
```bash
php artisan migrate --seed
```

This will create:
- 16 sectors with metadata
- 37 NIST control families
- 3 sample simulation modules
- 20 achievements
- 4 roles (admin, manager, analyst, trainee)
- 2 sample users

6. **Build Frontend Assets**
```bash
npm run build
```

7. **Start Development Server**
```bash
php artisan serve
```

Visit: http://localhost:8000

## 👤 Default Credentials

### Super Admin
- **Email**: admin@criticalcybersim.com
- **Password**: password

### Trainee
- **Email**: trainee@example.com
- **Password**: password

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/DashboardTest.php

# Run with coverage
php artisan test --coverage
```

## 🎨 Development Workflow

### Backend Development
```bash
# Format PHP code
vendor/bin/pint

# Run tests
php artisan test --compact

# Check routes
php artisan route:list --except-vendor

# Generate IDE helpers
php artisan ide-helper:generate
```

### Frontend Development
```bash
# Development mode with HMR
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Lint & format
npm run lint
npm run format
```

### Database Management
```bash
# Fresh migration
php artisan migrate:fresh --seed

# Rollback
php artisan migrate:rollback

# Create migration
php artisan make:migration create_table_name

# Create model with factory and migration
php artisan make:model ModelName -mf
```

## 📁 Project Structure

```
app/
├── Http/
│   └── Controllers/
│       ├── Dashboard/DashboardController.php
│       ├── Simulation/SimulationController.php
│       ├── Analytics/AnalyticsController.php
│       └── Admin/AdminDashboardController.php
├── Models/                 # Eloquent models
├── Services/              # Business logic layer
│   ├── SimulationEngine/
│   ├── Gamification/
│   ├── AdaptiveLearning/
│   └── Analytics/
└── Providers/

config/
├── cybersim.php           # Gamification configuration
├── sectors.php            # 16 critical sectors
└── nist.php               # NIST control families

database/
├── migrations/            # Database schema
├── seeders/              # Sample data
└── factories/            # Test data factories

resources/
├── css/
│   └── app.css           # Tailwind styles
└── js/
    ├── app.tsx           # React entry point
    ├── components/       # Reusable UI components
    ├── layouts/          # Page layouts
    ├── pages/            # Inertia pages
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utilities
    └── types/            # TypeScript types

routes/
├── web.php               # Application routes
├── auth.php              # Authentication routes
└── settings.php          # Settings routes

tests/
├── Feature/              # Integration tests
└── Unit/                 # Unit tests
```

## 🔒 Security Features

- **Authentication**: Laravel Sanctum with SPA authentication
- **Authorization**: Spatie Permission with role-based access control
- **CSRF Protection**: Automatic CSRF token validation
- **XSS Protection**: Blade/React escaping by default
- **SQL Injection Prevention**: Eloquent ORM with parameter binding
- **Rate Limiting**: Built-in Laravel rate limiting
- **Audit Logging**: Complete activity log with Spatie Activity Log

## 📈 Gamification System

### Level System (6 Levels)
1. **Novice** (Level 1) - 0-999 points - Gray
2. **Trainee** (Level 2) - 1,000-2,499 points - Green
3. **Analyst** (Level 3) - 2,500-4,999 points - Blue
4. **Specialist** (Level 4) - 5,000-9,999 points - Purple
5. **Expert** (Level 5) - 10,000-19,999 points - Orange
6. **Elite Defender** (Level 6) - 20,000+ points - Red

### Achievement Categories
- **Milestones**: First simulation, 10/50/100 completions
- **Performance**: Perfect scores, high average scores
- **Streaks**: 7/30/100 day learning streaks
- **Sectors**: Sector completion achievements
- **Speed**: Fast completion times
- **Dedication**: Total training hours

### Point System
- Base points per module completion
- Difficulty multipliers (1.0x → 2.0x)
- Performance bonuses
- Streak multipliers

## 🌐 Deployment

### Production Checklist
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Configure production database credentials
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`
- [ ] Run `npm run build`
- [ ] Set up SSL certificate
- [ ] Configure queue workers
- [ ] Set up scheduled tasks (cron)
- [ ] Configure logging and monitoring

### Laravel Cloud Deployment
```bash
# Deploy with Laravel Cloud (recommended)
# Visit https://cloud.laravel.com
```

### Docker Deployment (Laravel Sail)
```bash
# Start containers
./vendor/bin/sail up -d

# Run migrations
./vendor/bin/sail artisan migrate --seed

# Build frontend
./vendor/bin/sail npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style
- PHP: Laravel Pint (PSR-12)
- TypeScript/React: ESLint + Prettier
- Commits: Conventional Commits

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **CISA** - Critical Infrastructure Security and Resilience framework
- **NIST** - SP 800-53 Rev.5 Security Controls
- **Laravel Team** - Laravel 12 framework
- **React Team** - React 19
- **Inertia.js** - Modern monolith approach
- **Tailwind Labs** - Tailwind CSS
- **Shadcn** - Beautiful UI components

## 📞 Support

For questions, issues, or support:
- **Documentation**: [Internal Wiki](#)
- **Issues**: [GitHub Issues](#)
- **Security**: Report vulnerabilities to security@example.com

## 🗺️ Roadmap

- [x] Core simulation engine
- [x] 16 critical infrastructure sectors
- [x] Gamification system
- [x] Analytics dashboard
- [ ] Mobile application (React Native)
- [ ] AI-powered threat scenarios
- [ ] Multi-language support
- [ ] Advanced reporting for compliance
- [ ] Integration with SIEM systems
- [ ] Red team vs blue team competitions

---

**Built with ❤️ for U.S. Critical Infrastructure Protection**

🛡️ **Securing America's Critical Infrastructure, One Simulation at a Time** 🛡️

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## License

The Laravel + React starter kit is open-sourced software licensed under the MIT license.
