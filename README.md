# Build Admin Panel

This project is a web application built using. The purpose of this project is to create a user-friendly and responsive web
application for managing projects, expenses, and users.

## Project Structure

The project is organized into three main directories: `public`, `server`, and `src`.

### `public`

This directory contains static assets such as the main HTML file (`index.html`), `manifest.json`, and `robots.txt`.

### `server`

This directory holds the server-side logic, including the main entry point for the server-side application (`server.ts`).
The `dist` subdirectory contains compiled JavaScript files (`db.js` and `server.js`). The `models` subdirectory contains
TypeScript files for the application's data models (`Expense.ts`, `Project.ts`, and `User.ts`).

### `src`

This directory is the heart of the React application. It contains the main entry point for the React application (`App.tsx`)
and various subdirectories that organize the components and supporting files:

- **assets:** Contains images and icons used throughout the application.
- **components:** Houses the individual React components that make up the application's UI. Each component has its own
  subdirectory (e.g., `AuthPage`, `Buttons`, `Expenses`, `Header`, `Home`, `Navigation`, `ProjectDropdown`, `Projects`,
  and `Statistics`). Each subdirectory contains the component's TypeScript file (e.g., `AuthPage.tsx`), CSS file (
  e.g., `AuthPage.css`), and any additional files (e.g., `AddExpenseModal.tsx`).
- **hooks:** Contains custom React hooks that provide reusable state and side effects for the application.

## Available Scripts

In the project directory, you can run:

### `npx react-scripts start`

Runs the front end side of the app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npx tsx server.ts`

Runs the back end side of the app.
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory and add the following
variables:

JWT_SECRET_KEY=