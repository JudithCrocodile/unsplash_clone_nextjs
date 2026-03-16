# Unsplash Clone Project

A full-stack photo sharing application built with Next.js, React, TypeScript, and MongoDB. The app covers the full flow from browsing and uploading photos to authentication, likes, account management, and password reset.

<img width="1728" alt="unsplash_clone" src="https://github.com/user-attachments/assets/bbcc71d3-7842-4777-9481-65cbe29ca075">

## Demo

Live site: [https://unsplash-clone-nextjs.vercel.app/](https://unsplash-clone-nextjs.vercel.app/)

## Tech Stack

### Frontend

- Next.js 14 (Pages Router)
- React 18
- TypeScript
- Redux Toolkit + React Redux
- MUI
- Sass + Tailwind CSS

### Backend

- Next.js API Routes
- MongoDB
- Mongoose
- JWT authentication
- Nodemailer

### Media and Infra

- Cloudinary for image hosting
- Vercel for deployment

## Features

- Email and password sign up / login
- JWT-based authentication
- Browse photo feed with infinite scroll
- Filter photos by category
- View photo detail in dialog
- Like and unlike photos
- Upload photos with Cloudinary
- Add tags, description, and location during upload
- User profile pages with personal uploads and liked photos
- Edit profile, change password, and close account
- Forgot password and reset password flow

## Architecture Overview

This is a single Next.js application that serves both the UI and backend APIs.

- `pages/` contains route pages for the web app.
- `pages/api/` contains server-side endpoints for auth, photos, tabs, likes, and account actions.
- `pages/api/models/` contains Mongoose models for `User`, `Photo`, `Like`, and `Tab`.
- `components/` contains reusable UI building blocks and feature components.
- `lib/` contains shared infrastructure such as database connection, API helpers, validation, and security utilities.
- `store/` contains Redux state for auth and user data.

## API Overview

Main API areas in `pages/api/`:

- `user`: login, create account, logout, forgot password, reset password, update profile, update password, upload avatar, close account
- `photo`: upload photo metadata, fetch feed pages, fetch photo detail, serve uploaded files
- `tab`: fetch available tags/categories
- `like`: toggle photo likes

Core APIs return a consistent JSON shape:

```json
{
    "status": 200,
    "code": "SUCCESS_CODE",
    "message": "Human readable message",
    "data": {}
}
```

## Security and Validation

- JWT token validation for protected APIs
- Middleware cleanup for invalid or expired auth cookies
- Request validation for key auth and upload endpoints
- In-memory rate limiting for sensitive routes such as login and password reset
- Generic password reset responses to reduce account enumeration risk

## Data Model

Main entities:

- `User`: account info, avatar, password hash, reset token metadata
- `Photo`: image path, Cloudinary public ID, description, location, author, tags, created time
- `Like`: relation between user and photo
- `Tab`: category/tag used to organize photos

## Local Development

### 1. Install dependencies

```bash
pnpm install
```

If you do not use pnpm, `npm install` also works.

### 2. Configure environment variables

Create a `.env.local` file in the project root.

```bash
MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
MAIL_PASS=
```

Notes:

- `MONGODB_URI` is required for database access.
- `JWT_SECRET` is required for auth token signing and verification.
- `NEXT_PUBLIC_DOMAIN` is used when generating password reset URLs and local asset URLs.
- Cloudinary variables are required for image upload from the client.
- `MAIL_PASS` is required for the Gmail-based password reset mail flow.

### 3. Start the development server

```bash
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
.
├── components/      # reusable UI and feature components
├── lib/             # database, API client, validators, security helpers
├── pages/           # Next.js pages and API routes
├── public/          # static assets and uploaded files
├── store/           # Redux store modules
├── styles/          # global and page-level styles
├── types/           # TypeScript declaration files
└── types.ts         # shared application types
```

## Scripts

- `pnpm dev`: start the local development server
- `pnpm build`: create a production build
- `pnpm start`: run the production build
- `pnpm lint`: run Next.js linting

## Testing

Automated tests are not set up yet. Current verification is primarily manual through local development flows and API behavior checks.

## Known Limitations

- Rate limiting is in-memory, so it is suitable for a small project but not enough for distributed production environments.
- Some older endpoints and UI areas may still have inconsistent naming or typing because the project evolved incrementally.
- Password reset email delivery currently depends on Gmail-based transport configuration.
- There is no automated test suite yet.

## Roadmap

- Add automated tests for API routes and critical user flows
- Improve observability and error logging
- Harden production-grade rate limiting and auth/session handling
- Continue standardizing API contracts and type definitions
- Improve image management and moderation workflows

## Notes

This project is inspired by Unsplash for learning and technical practice. It is intended to explore full-stack product flows, not to replicate the original service for commercial use.
