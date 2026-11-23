# BatoKhula - Backend
BatoKhula is a road navigation and road-condition reporting application designed to help people in Nepal access road information and report road-related issues.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Road condition reporting
- PostgreSQL database integration
- Prisma ORM(Help node.js to communicate with database)


## Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Token (JWT)
- **Password Hashing:** bcryptjs
- **Language:** JavaScript

## Project Structure

```text
batokhula-backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   └── roadReports.js
│   ├── server.js
│   └── prisma.js
├── .env
├── .gitignore
├── package.json
└── README.md

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/noodkimma-ai/batokhula-backend.git

## Database Setup

### 1. Configure PostgreSQL

Make sure PostgreSQL is installed and running.

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/Batokhula_db"
JWT_SECRET="cc8efc6d3196e228122507353980895f9917ca5e2bd174eb4160f3f42dcc0c66de3618f056537ea29f78066680f7de125fab2c5d5a461f73952ba7609d9d2492"
ADMIN_PASSWORD="Admin@123"