# Changelog

All notable changes to CodeNotify will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-beta] - 2026-01-06

### Added
- **Auto-Login After Email Verification**: New users are automatically logged in after verifying their email via OTP
- **Centralized Version Management**: Single source of truth for version numbers across frontend, backend, and documentation
- **Multi-Platform Contest Tracking**: Support for Codeforces, LeetCode, CodeChef, and AtCoder
- **Email OTP Verification System**: Secure 6-digit OTP with rate limiting and attempt tracking
- **Professional Changelog Page**: Timeline-based version history display with categorized changes
- **Admin Dashboard**: Contest management interface with platform sync functionality
- **Contest Notifications**: Email, WhatsApp, and push notification support
- **Calendar Integration**: Export contests to calendar (ICS format)

### Improved
- **Authentication Flow**: Streamlined signup → verify → auto-login process
- **Dashboard UI**: Mobile-first responsive design with enhanced contest cards
- **Dark Mode**: Full dark mode support across all pages
- **Contest Filtering**: Advanced filtering by platform, difficulty, and status

### Security
- **JWT Token Rotation**: Implemented refresh token rotation for enhanced security
- **OTP Rate Limiting**: Added rate limiting and attempt tracking for OTP verification
- **Email Verification**: Required email verification for premium features

### Fixed
- **TypeScript Errors**: Resolved missing imports and type issues
- **Mobile Responsiveness**: Fixed layout issues on mobile devices
- **Contest Sync**: Improved reliability of contest data synchronization

## [0.0.1-alpha] - 2025-10-16

### Added
- **Core Backend Infrastructure**: NestJS, MongoDB, and BullMQ for robust scheduling
- **Frontend Foundation**: Next.js 15 with Tailwind CSS, Zustand, and React Query
- **Authentication System**: JWT-based auth with Google OAuth integration
- **Contest Sync Service**: Automated contest data synchronization from multiple platforms
- **User Preferences**: Customizable notification settings and platform preferences
- **Role-Based Access Control**: Admin and user roles with protected routes

### Technical
- **Database Schema**: MongoDB schemas for users, contests, and notifications
- **API Documentation**: Comprehensive API reference and guides
- **Email Templates**: React-based email templates with Resend integration
- **Scheduler Jobs**: Automated contest sync and notification jobs

---

## Version History

- **v0.1.0-beta** (2026-01-06) - Initial public beta release
- **v0.0.1-alpha** (2025-10-16) - Internal alpha testing

## Links

- [GitHub Repository](https://github.com/Celestial-0/CodeNotify)
- [Documentation](https://celestial-0.github.io/CodeNotify/)
- [Report Issues](https://github.com/Celestial-0/CodeNotify/issues)
