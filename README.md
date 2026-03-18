# Vulnerable E-Shop Application

This repository contains an intentionally vulnerable e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It is designed for **SAST (Static Application Security Testing)** and **SCA (Software Composition Analysis)** validation purposes.

**⚠️ WARNING: DO NOT DEPLOY THIS APPLICATION IN A PRODUCTION ENVIRONMENT. IT CONTAINS INTENTIONAL SECURITY FLAWS.**

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (usually comes with Node.js)
- **MongoDB** (Ensure a local MongoDB instance is running on default port 27017)

## Installation

1.  **Clone the repository** (if you haven't already).
2.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1.  **Start the Backend Server**:
    Open a terminal, navigate to the `backend` directory, and run:
    ```bash
    npm start
    ```
    The server works on port 5000 (default).

2.  **Start the Frontend Application**:
    Open a second terminal, navigate to the `frontend` directory, and run:
    ```bash
    npm run dev
    ```
    The frontend typically runs on `http://localhost:5173`.

## Authenticating
- **Register**: You can register a new user at `/register`.
- **Login**: Use the credentials you created. Note that login uses **Username**, not Email.
