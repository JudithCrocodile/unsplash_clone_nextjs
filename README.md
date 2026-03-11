# Unsplash Clone (Next.js Full-Stack)

A full-stack photo platform built with Next.js, React, and MongoDB.

Highlights:
- Frontend: upload workflow, photo feed, auth UI, account settings
- Backend: API Routes, MongoDB models, JWT auth, password reset, baseline security hardening

<img width="1728" alt="unsplash_clone" src="https://github.com/user-attachments/assets/bbcc71d3-7842-4777-9481-65cbe29ca075">

---

## 🚀 Demo
- Frontend: [https://unsplash-clone-nextjs.vercel.app/](https://unsplash-clone-nextjs.vercel.app/)

---

## 🛠 Tech Stack

### Frontend
- Next.js (Pages Router)
- React + TypeScript
- Redux Toolkit
- MUI + SCSS/Tailwind

### Backend
- Next.js API Routes
- MongoDB + Mongoose
- JWT / bcrypt
- Nodemailer (forgot password flow)
- Cloudinary (image upload)

---

## ✨ Features

- Email signup / login
- Profile editing / password change / account closure
- Forgot password (email + reset token)
- Image upload (Cloudinary)
- Photo feed pagination, category tags, likes

---

## 🔐 Security & Validation
- JWT token expiry/invalid handling (middleware + API)
- Basic rate-limiting for Login / Forgot Password / Reset Password
- API input validation:
    - email format
    - minimum password length
    - photos payload structure and tabs length limits
- Unified login error messages (to reduce account enumeration risk)

> Note: current rate-limiting is single-instance in-memory; Redis is recommended for multi-instance deployments.

---

## ⚙️ Local Setup

```bash
pnpm install
pnpm dev
```

Production build:
```bash
pnpm build
pnpm start
```

---

## ✅ Testing (Manual Checklist)

No automated test suite yet. Manual verification flow:
1. Sign up → Login
2. Upload photo → verify it appears on the homepage
3. Like / Unlike
4. Forgot password email → Reset password
5. Update profile and avatar

---

## ⚖️ Technical Decisions & Trade-offs
- **Next.js API Routes**: fast iteration in a single repo; can be split into a dedicated backend service when scale/ownership grows.
- **In-memory rate limit**: zero infra cost for MVP; not shared across multiple instances.
- **Standardized API response shape**: simpler and more consistent frontend error handling.
- **Shared API client/functions**: pages no longer depend on raw URLs, reducing maintenance overhead.

---

## UI / UX Reference

The UI and user flow of this project are inspired by Unsplash.

The purpose of using Unsplash as a regerence was to focus on frontend architecture, data flow, and full-stack implementation rather than UI/UX design from scratch.

This project is intended for learning and rechnical practice only, not for commercial use.

---

## Notes

This project was built to practice transitioning from Vue to React.
The main focus was understanding differences in state management, component design, and data flow between the two frameworks.

---

## 🗺 Roadmap
- [ ] Add automated API integration tests
- [ ] Move rate-limiting store to Redis
- [ ] Add CI pipeline (lint + build + test)
- [ ] Improve query/cache performance for photo feed