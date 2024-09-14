# ToDo List Application

## Overview

This project is a React-based ToDo list application that allows users to create, view, update, and delete tasks. The application also includes features such as task filtering and search functionality.

## Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine. Open your terminal and run:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

#### Base Folder

Navigate to the base folder of the project where the server-side code (e.g., server.js) is located.

```bash
cd <base-folder>
npm install
```

#### Client Folder

Navigate to the client folder where the React application is located.

```bash
cd client
npm install
```

### 3. Set Up Environment Variables

Make sure to configure any necessary environment variables. Create a .env file in the root of the project directory (if it doesn’t already exist) and add your environment variables there. The .env file might look something like this:

```bash
PORT=your_port_here
DB_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

Adjust the variables according to your project's requirements.

### 4. Run the Application

#### Start the Server

In the base folder, start the server:

```bash
cd <base-folder>
npm run dev
```

#### Start the Client

In a new terminal, navigate to the client folder and start the React application:

```bash
cd <repository-folder>/client
npm start
```

The client-side application should now be running on http://localhost:3000 (or the port specified in the React app configuration), and the server-side application should be running on http://localhost:5000 (or the port specified in the server configuration).

### 5. Project Structure

The project is organized into two main parts:

#### 1. Server-Side Code (Base Folder):

- Contains server-related code.
- Key files and folders:
  - server.js: Main entry point for the server.
  - controllers: Contains controller logic.
  - middleware: Contains middleware functions.
  - models: Contains database models.
  - routers: Contains route definitions.

#### 2. Client-Side Code (Inside the client Folder):

- Contains the React application.
- Key folders:
  - src/components: Reusable React components.
  - src/pages: Page components like the ToDo list page.
  - src/services: API service functions.
  - src/util: Utility functions.

### 6. Folder Structure

### Base Folder

- controllers: Handle business logic and interact with models.
- middleware: Contains middleware functions for request processing.
- models: Define database schemas and models.
- routers: Define API routes.
- server.js: Entry point for the server, sets up middleware and routes.

### Client Folder

- src/components: Contains reusable React components.
- src/pages: Contains page components such as the ToDo list page.
- src/services: Contains API service functions.
- src/util: Contains utility functions.

### Common Commands

- Start Development Server: `npm run dev`
- Start Server: `npm start` (inside the base folder, for production mode)

### 7. Sample Screenshots

| ![Landing Page](https://raw.githubusercontent.com/dakshinakasun/To-Do-App/main/images/LandingPage.png) | ![Login Page](https://raw.githubusercontent.com/dakshinakasun/To-Do-App/main/images/LoginPage.png) | ![Register Page](https://raw.githubusercontent.com/dakshinakasun/To-Do-App/main/images/RegisterPage.png) |
|:--:|:--:|:--|

| ![Incomplete Page](https://raw.githubusercontent.com/dakshinakasun/To-Do-App/main/images/IncompletePage.png) | ![Complete Page](https://raw.githubusercontent.com/dakshinakasun/To-Do-App/main/images/CompletePage.png) |
|:--:|:--:|
