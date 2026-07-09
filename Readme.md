# ShopO — Multivendor MERN E-Commerce Platform

A full-stack multivendor e-commerce marketplace built with the MERN stack. Supports three roles — buyers, sellers, and admins — with product and event listings, discount coupons, real-time chat, order lifecycle management, refunds, and Stripe/PayPal payments.

## Features

**Buyer**
- Browse products by category, search, and view product/event details
- Add to cart and wishlist, checkout with Stripe or PayPal
- Track orders, request refunds, leave product reviews
- Real-time chat with sellers
- Manage profile, saved addresses, and password

**Seller**
- Seller dashboard with sales overview and earnings (after platform service charge)
- Create, edit, and delete products and time-limited events
- Create discount coupon codes scoped to specific products
- Manage orders — update status through the full delivery lifecycle, process refunds
- Real-time chat with buyers
- Withdraw available balance

**Admin**
- Platform-wide dashboard — orders, sellers, and earnings overview
- Manage all sellers and withdrawal requests
- Protected admin-only routes

## Tech Stack

**Frontend:** React 19, Redux Toolkit, React Router v7, Tailwind CSS, MUI (Data Grid), Socket.IO Client, Axios, React Toastify

**Backend:** Node.js, Express 5, MongoDB with Mongoose 9, JWT authentication, bcryptjs, Cloudinary (image uploads), Nodemailer, Stripe & PayPal payments, Socket.IO

## Project Structure

```
multivendor-mern/
├── backend/
│   ├── controller/     # Route handlers (auth, products, orders, payments, etc.)
│   ├── model/          # Mongoose schemas
│   ├── middleware/     # Auth guards, error handling, async wrapper
│   ├── utils/           # Helpers (ErrorHandler, JWT token, mail sender)
│   ├── db/              # Database connection
│   ├── app.js            # Express app setup
│   └── server.js         # Entry point
├── frontend/
│   └── src/
│       ├── components/  # Shared, Shop (seller), Admin, and Route components
│       ├── pages/        # Top-level routed pages
│       ├── redux/         # Actions, reducers, store
│       └── static/         # Static config data (nav, categories)
└── socket-server/         # Standalone Socket.IO server for real-time chat
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (image hosting)
- Stripe account (test mode keys are fine for development)
- PayPal developer account
- SMTP credentials for transactional email (e.g. Gmail app password)

### 1. Clone the repository
```bash
git clone https://github.com/bikeeprajapati/multivendor-mern.git
cd multivendor-mern
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/config/.env` with the following variables:
```env
PORT=8000
NODE_ENV=DEVELOPMENT
DB_URL=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d
ACTIVATION_SECRET=your_activation_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SMPT_HOST=smtp.gmail.com
SMPT_PORT=465
SMPT_SERVICE=gmail
SMPT_MAIL=your_email@gmail.com
SMPT_PASSWORD=your_app_password

STRIPE_API_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run the backend:
```bash
npm run dev
```
Server runs on `http://localhost:8000`.

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
GENERATE_SOURCEMAP=false
```

Run the frontend:
```bash
npm start
```
App runs on `http://localhost:3000`.

### 4. Socket server (real-time chat)
```bash
cd socket-server
npm install
node server.js
```
Runs on `http://localhost:4000`.

All three (backend, frontend, socket server) need to be running simultaneously in development.

## Available Scripts

**Backend**
| Command | Description |
|---|---|
| `npm run dev` | Start backend with nodemon (auto-restart) |
| `npm start` | Start backend in production mode |

**Frontend**
| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Create a production build |

## Deployment Notes

- Set `NODE_ENV=PRODUCTION` in the backend environment for production deployments
- Update CORS `origin` in `backend/app.js` to include your deployed frontend URL
- Update the `server` and socket `ENDPOINT` constants in the frontend to point at deployed backend/socket URLs
- Never commit `.env` files — see `.gitignore`

## License

This project was built as part of a learning course (Becodemy Multi-Vendor MERN E-commerce tutorial) and is intended for educational purposes.