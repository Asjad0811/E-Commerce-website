# ShopKart — Full-Stack E-Commerce Website

A complete beginner-friendly e-commerce website built with:

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- Cart: browser localStorage
- Orders: MongoDB

## Features

- Responsive modern storefront
- Product search and category filters
- Product detail page
- Add/remove/update shopping cart
- User registration
- User login/logout
- Protected checkout
- Order creation and stock reduction
- User order history
- Seeded sample products

## Requirements

Install:

- Node.js 18+
- MongoDB locally, or use a MongoDB Atlas connection string

## Run

1. Open a terminal:

```bash
cd backend
npm install
```

2. Copy `.env.example` to `.env` and update the values.

3. Start MongoDB.

4. Seed products:

```bash
npm run seed
```

5. Start the application:

```bash
npm run dev
```

6. Open:

http://localhost:5000

The Express server serves both the API and frontend, so there is no separate frontend server to configure.

## API

### Auth

POST `/api/auth/register`

POST `/api/auth/login`

### Products

GET `/api/products`

GET `/api/products/:id`

Optional query parameters:

`/api/products?search=laptop&category=Electronics`

### Orders

POST `/api/orders` — requires `Authorization: Bearer <token>`

GET `/api/orders/mine` — requires authentication

## Notes

This is a complete learning/demo store. For production, add a real payment provider, server-side rate limiting, CSRF protection where applicable, stricter validation, admin product management, transactional inventory updates, secure deployment secrets, image hosting and HTTPS.
