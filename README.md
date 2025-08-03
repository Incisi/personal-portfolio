<div align="right">
  Leia em outros idiomas: <a href="./README.pt-br.md">🇧🇷 Português (BR)</a>
</div>

# David Incisi's Personal Portfolio

This is the official repository for my personal portfolio, a full-stack application built from the ground up to showcase my skills, projects, and professional journey. It's more than a static website; it's a dynamic, content-managed platform with a secure administrative backend.

The public-facing site serves as my professional introduction, while the `/journey` page acts as a "digital garden," documenting the courses, books, and articles that shape my thinking. All content is managed through a secure, custom-built admin dashboard.

---

## ✨ Features

- **Dynamic Content:** The portfolio dynamically fetches pinned projects from the GitHub API.
- **"Journey" Section:** A dedicated area to showcase continuous learning through courses, books, and personal articles (blog).
- **Secure Admin Dashboard:** A protected `/admin` route with JWT-based authentication.
- **Full Content Management:** A complete CRUD (Create, Read, Update, Delete) interface for managing all dynamic site content.
- **Functional Contact Form:** An API endpoint that forwards messages from the contact form directly to my email using Nodemailer.
- **Automated Testing:** A suite of unit tests for the backend API to ensure reliability and code quality.
- **Responsive Design:** A polished and fully responsive UI that works seamlessly across all devices.

---

## 🛠️ Tech Stack

| Backend (API) | Frontend (Web) |
| :--- | :--- |
| ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) | ![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| ![TypeORM](https://img.shields.io/badge/-TypeORM-E0234E?style=for-the-badge) | ![CSS Modules](https://img.shields.io/badge/-CSS_Modules-000000?style=for-the-badge&logo=css-modules&logoColor=white) |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) |
| ![JWT](https://img.shields.io/badge/-JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) |
| ![Jest](https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) | ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) |

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- A running instance of [PostgreSQL](https://www.postgresql.org/)

### Installation Guide

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/incisi/personal-portfolio.git](https://github.com/incisi/personal-portfolio.git)
    cd personal-portfolio
    ```

2.  **Setup the Backend (`portfolio-backend`):**

    ```bash
    cd portfolio-backend
    npm install
    ```

    > **Important:** You must configure your environment variables.
    >
    > -   Rename the `.env.example` file to `.env`.
    > -   Open the `.env` file and fill in all the required credentials: your PostgreSQL database connection details, your GitHub username and Personal Access Token (PAT), your SMTP email credentials (for the contact form), and a unique `JWT_SECRET`.

3.  **Setup the Frontend (`personal-portfolio-frontend`):**

    ```bash
    cd ../personal-portfolio-frontend
    npm install
    ```

    > **Important:** Configure the frontend environment variable.
    >
    > -   Rename the `.env.local.example` file to `.env.local`.
    > -   The default `VITE_API_BASE_URL=http://localhost:3000` is correct for local development.

---

## 🏃 Running the Application

This is a full-stack project, so you will need to run the backend and frontend servers simultaneously in two separate terminals.

**Terminal 1: Start the Backend Server**

```bash
cd portfolio-backend
npm run start:dev
```

The API will be available at `http://localhost:3000`.

**Terminal 2: Start the Frontend Development Server**

```bash
cd personal-portfolio-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## ✅ Running Tests

The backend includes a suite of unit tests to ensure the API logic is working correctly.

To run the tests, navigate to the backend directory and use the following command:

```bash
cd portfolio-backend
npm run test
```

## 👤 Author

**David Incisi**

-   GitHub: [@incisi](https://github.com/incisi)
-   LinkedIn: [in/incisi](https://linkedin.com/in/incisi)