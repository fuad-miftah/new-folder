# User Management Project

## Overview
![nest](https://github.com/fuad-miftah/usermanagment-react-nestjs/assets/85777124/ebe20f6f-50a4-4737-abf2-9a0c61487c9f)

This is a user management project built with a monorepo structure, powered by Turbo, Vite, React, and NestJS with Prisma. It allows you to manage users by performing operations such as adding, deleting, updating, and displaying user information in a table.

## Features

- Add new users with their name, email, password, and phone number.
- Delete existing users.
- Update user information, including name, email, password, and phone number.
- View a list of all users in a table.

## Prerequisites

- Node.js: Make sure you have Node.js installed (v14 or higher).
- PostgreSQL: This project uses PostgreSQL as the database. Make sure it's installed and running.
- npm: It's recommended to use npm for package management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fuad-miftah/usermanagment-react-nestjs.git

2. Navigate to the project's root directory:
   
   ```bash
   cd nest-react

4. Install the project dependencies:

    ```bash
   npm install

4. Set up the database connection:

   create a .env file

   Update the database connection URL in the Prisma .env file (e.g., DATABASE_URL=postgresql://username:password@localhost/defaultdb).

5. Apply database migrations:

    ```bash
    cd apps/api

    ```bash
    npx prisma migrate dev --name init

6. Start the development server:

    ```bash
   cd ../..

    ```bash
   npm run dev
Your project should now be up and running.

Usage
Open the application in your browser.
Use the web interface to manage users by adding, updating, or deleting them.
The user table displays a list of all users.
