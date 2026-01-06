# EFL Platform - System Architecture Documentation

## Project Overview
**Education For Liberty (EFL)** is a comprehensive educational platform built with Laravel 12 and React (Inertia.js) that facilitates global university admissions, student management, and educational resources.

## Technology Stack

### Backend
- **Framework**: Laravel 12.44.0
- **PHP Version**: 8.4.15
- **Database**: MySQL/MariaDB
- **Authentication**: Laravel Sanctum
- **API**: Inertia.js (Server-Side Rendering)

### Frontend
- **Framework**: React 18+ with TypeScript
- **Routing**: Inertia.js
- **Build Tool**: Vite 7.3.0
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with modern design patterns

### Development Tools
- **Package Manager**: npm
- **Code Quality**: TypeScript, Laravel Pint
- **Version Control**: Git

## Directory Structure

```
EFL/
├── efl_core/                    # Laravel application core
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Admin/       # Admin panel controllers
│   │   │   │   ├── Auth/        # Authentication controllers
│   │   │   │   ├── Author/      # Author dashboard controllers
│   │   │   │   ├── Shop/        # eBook marketplace controllers
│   │   │   │   └── Student/     # Student portal controllers
│   │   │   └── Middleware/
│   │   ├── Models/              # Eloquent models
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/          # Database schema
│   │   └── seeders/             # Sample data seeders
│   ├── resources/
│   │   ├── js/
│   │   │   ├── Components/      # Reusable React components
│   │   │   ├── Layouts/         # Page layouts
│   │   │   └── Pages/           # Inertia pages
│   │   └── views/
│   ├── routes/
│   │   └── web.php              # Application routes
│   └── bootstrap/
│       └── app.php              # Application bootstrap
├── public_html/                 # Public web root
│   ├── build/                   # Compiled assets
│   ├── storage/                 # Symlink to storage/app/public
│   └── index.php                # Entry point
└── _assets/                     # Static assets

```

## Deployment Architecture

### Split Architecture (Production)
The application uses a **split architecture** for enhanced security:

```
Server Root/
├── efl_core/                    # Private (above web root)
│   └── [Laravel application]
└── public_html/                 # Public (web root)
    ├── index.php                # Points to ../efl_core/bootstrap/app.php
    ├── build/                   # Compiled frontend assets
    └── storage/                 # Symlink to ../efl_core/storage/app/public
```

**Benefits**:
- Laravel core files are not web-accessible
- Only compiled assets and entry point are public
- Enhanced security for configuration and source code

### Local Development
- **WAMP**: `http://localhost/efl/public_html/`
- **Artisan Serve**: `http://127.0.0.1:8000/`

## Core Modules

### 1. University Management
- University profiles with rich content
- Program listings by level
- Important dates and deadlines
- Student success stories
- Dynamic content management

### 2. Application System
- Student application workflow
- Document upload and tracking
- Application status management
- Admin review and processing

### 3. User Roles & Permissions
- **Admin**: Full system access
- **Staff**: Application and student management
- **Student**: Apply, track applications, access resources
- **Author**: Create and sell educational content

### 4. eBook Marketplace
- Author registration and approval
- Book creation and publishing
- Shopping cart and checkout
- Digital library for purchased books
- Review and rating system
- Revenue tracking for authors

### 5. Messaging System
- Internal messaging between users
- File attachments support
- Thread-based conversations
- Read/unread status tracking

### 6. Appointment Scheduling
- Student-counselor appointments
- Calendar integration
- Status management (pending, confirmed, completed)

### 7. Events & Blog
- Event management and registration
- Blog posts and articles
- Public and authenticated access

### 8. Settings Management
- Homepage customization
- System configuration
- Email, SMS, and payment gateway settings
- Multi-language support (planned)

## Database Schema Overview

### Core Tables
- `users` - All system users
- `universities` - University profiles
- `programs` - Academic programs
- `applications` - Student applications
- `scholarships` - Scholarship opportunities
- `messages` - Internal messaging
- `appointments` - Counseling appointments
- `settings` - System configuration

### eBook Marketplace Tables
- `books` - eBook catalog
- `book_categories` - Book categorization
- `orders` - Purchase orders
- `order_items` - Order line items
- `user_library` - Student's purchased books
- `reviews` - Book reviews
- `wishlists` - Student wishlists

## Authentication & Authorization

### Authentication
- Laravel Breeze for authentication scaffolding
- Session-based authentication
- Remember me functionality
- Password reset via email

### Authorization
- Gate-based permissions
- Role-based access control (admin, staff, student, author)
- Middleware protection on routes
- Policy-based model authorization

## Frontend Architecture

### Component Structure
```
Components/
├── ApplicationLogo.tsx
├── Badge.tsx
├── Checkbox.tsx
├── DangerButton.tsx
├── Dropdown.tsx
├── InputError.tsx
├── InputLabel.tsx
├── Modal.tsx
├── NavLink.tsx
├── PrimaryButton.tsx
├── ResponsiveNavLink.tsx
├── SecondaryButton.tsx
├── TextInput.tsx
└── Textarea.tsx
```

### Layout System
- `AuthenticatedLayout.tsx` - For logged-in users
- `PublicLayout.tsx` - For public pages
- `GuestLayout.tsx` - For auth pages

### Page Organization
```
Pages/
├── Admin/          # Admin panel pages
├── Auth/           # Login, register, password reset
├── Author/         # Author dashboard
├── Blog/           # Blog listing and posts
├── Events/         # Event management
├── Programs/       # Program listings
├── Shop/           # eBook marketplace
├── Student/        # Student portal
├── Universities/   # University profiles
└── Welcome.tsx     # Homepage
```

## API Integration

### Inertia.js Flow
1. User navigates to route
2. Laravel controller prepares data
3. Data passed to Inertia response
4. React component receives props
5. Component renders with data
6. User interactions trigger new requests

### Route Helpers (Ziggy)
- Type-safe route generation in TypeScript
- Automatic URL generation with parameters
- Shared routes between backend and frontend

## Asset Management

### Build Process
```bash
npm run build       # Production build
npm run dev         # Development with HMR
```

### Asset Pipeline
1. Vite compiles TypeScript/React
2. Assets output to `public_html/build/`
3. Laravel's `@vite` directive injects assets
4. Manifest file tracks versioned assets

### Code Splitting
- Vendor libraries separated into `vendor.js`
- Page-level code splitting
- Lazy loading for optimal performance

## Security Considerations

### CSRF Protection
- Automatic CSRF token validation
- Token included in forms and AJAX requests

### XSS Prevention
- React's automatic escaping
- `dangerouslySetInnerHTML` used sparingly with sanitized content

### File Uploads
- Validation of file types and sizes
- Storage in non-public directories
- Symlink for public access to approved files

### Environment Configuration
- Sensitive data in `.env` (gitignored)
- Different configs for dev/staging/production

## Performance Optimization

### Backend
- Query optimization with eager loading
- Route caching (`php artisan route:cache`)
- Config caching (`php artisan config:cache`)
- Database indexing on frequently queried columns

### Frontend
- Code splitting and lazy loading
- Image optimization
- Chunk size management (vendor separation)
- Asset versioning for cache busting

### Caching Strategy
- Route cache for production
- Config cache for production
- View compilation cache
- Browser caching via headers

## Monitoring & Logging

### Laravel Logging
- Daily log rotation
- Error tracking in `storage/logs/`
- Custom log channels for different modules

### Error Handling
- Custom error pages
- Exception reporting
- Debug mode (local only)

## Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run build`
- [ ] Update `.env` with production values
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure database credentials
- [ ] Set up mail configuration

### Deployment Steps
1. Upload `efl_core/` to server (above web root)
2. Upload `public_html/` contents to web root
3. Run `composer install --optimize-autoloader --no-dev`
4. Run `php artisan migrate --force`
5. Run `php artisan config:cache`
6. Run `php artisan route:cache`
7. Run `php artisan storage:link`
8. Set proper file permissions
9. Configure web server (Apache/Nginx)

### Post-Deployment
- [ ] Verify database connection
- [ ] Test critical user flows
- [ ] Check error logs
- [ ] Verify email sending
- [ ] Test file uploads

## Maintenance

### Regular Tasks
- Monitor error logs
- Database backups
- Update dependencies
- Security patches
- Performance monitoring

### Update Process
1. Test updates in staging
2. Backup production database
3. Put site in maintenance mode
4. Deploy updates
5. Run migrations
6. Clear caches
7. Test functionality
8. Bring site back online

## Future Enhancements

### Planned Features
- Multi-language support
- Advanced analytics dashboard
- Mobile application
- Real-time notifications
- Video conferencing integration
- AI-powered university matching
- Payment gateway integration
- Advanced reporting system

### Technical Debt
- Implement comprehensive testing (PHPUnit, Jest)
- Add API documentation (OpenAPI/Swagger)
- Improve error handling consistency
- Implement queue workers for background jobs
- Add Redis for caching and sessions

## Support & Documentation

### Resources
- Laravel Documentation: https://laravel.com/docs
- Inertia.js Documentation: https://inertiajs.com
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com

### Project Documentation
- `DEPLOY.md` - Deployment guide
- `EBOOK_IMPLEMENTATION_STATUS.md` - eBook feature status
- `EBOOK_MARKETPLACE_PROGRESS.md` - Marketplace development log

---

**Last Updated**: January 6, 2026
**Version**: 1.0.0
**Maintained By**: Development Team
