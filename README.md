# Unsplash Clone Prject
A full-stack photo web application built with React, Next.js, and MongoDB.

This project focuses on frontend architecture, API integration, and data flow between client and server.

<img width="1728" alt="unsplash_clone" src="https://github.com/user-attachments/assets/bbcc71d3-7842-4777-9481-65cbe29ca075">

---

## 🚀 Demo
- Frontend: [https://unsplash-clone-nextjs.vercel.app/](https://unsplash-clone-nextjs.vercel.app/)

---

## 🛠 Tech Stack

### Frontend
- React
- Next.js (SSR / API Routes)
- Javascript / TypeScript
- Fetch API

### Backend
- Node.js
- MongoDB(Mongoose)

---

## ✨ Features

- User photo upload
- Image preview before upload
- Form state management
- API-based data submission
- Server-side image handling
- MongoDB data persistence

---

##  🏗 Architecture Overview

The application follows a client-server architecture:

- Frontend handles UI rendering, user interaction, and form state.
- Backend provides RESTful APIs for data processing and persistence.
- Images and metadata are sent via multiple/form-data.
- MongoDB stores image metadata and user data.

---

## 🔄 Data Flow

1. User selects images on the frontend.
2. Frontend manages form state using React hooks.
3. Image and metadata are sent to backend via API.
4. Backend processes the request and stores data in MongoDB.
5. API response is returned and UI updates accordingly.

---
## ⚙️ Getting Started

```bash
# install dependencies
npm install

# run frontend
npm run dev

# run backend
npm start

```

---

## 📁 Folder Structure

```
├── frontend
│   ├── components
│   └── pages
│
└── backend
    └── pages
        ├── api
        │   ├── like
        │   ├── photo
        │   ├── tab
        │   └── user
        └── models

```

---

## 🔍 Key Implementation Details
- Used React Hooks to manage component state and side effects.
- Implemented API abstraction to centralize HTTP requests.
- Separated reusable UI components from page logic.
- Designed backend APIs to be frontend-friendly and predictable.

---

## 📌 Future Improvements
- Authentication system
- Image optimization
- Pagination and infinite ascroll
- Performance optimization

---

## UI / UX Reference

The UI and user flow of this project are inspired by Unsplash.

The purpose of using Unsplash as a regerence was to focus on frontend architecture, data flow, and full-stack implementation rather than UI/UX design from scratch.

This project is intended for learning and rechnical practice only, not for commercial use.

---

## Notes

This project was built to practice transitioning from Vue to React.
The main focus was understanding differences in state management, component design, and data flow between the two frameworks.


## ToDo List

- [x] Edit user profile
- [x] Change password
- [x] add X on dialog
- [ ] Close account
- [ ] Collection
- [ ] Facebook login
- [ ] location selector
- [ ] Forgot password
- [x] Like ❤️
