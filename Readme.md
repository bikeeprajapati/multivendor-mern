# ShopO — Multivendor MERN E-Commerce Platform

A full-stack multivendor e-commerce marketplace built with the MERN stack. Supports three roles — buyers, sellers, and admins — with product and event listings, discount coupons, real-time chat, order lifecycle management, refunds, and Stripe/PayPal payments.

## Live Demo

- **Frontend:** [multivendor-mern-ashy.vercel.app](https://multivendor-mern-ashy.vercel.app)
- **Backend API:** [multivendor-backend-219u.onrender.com](https://multivendor-backend-219u.onrender.com)
- **Socket server:** [multivendor-socket-61tp.onrender.com](https://multivendor-socket-61tp.onrender.com)

> **Note:** Backend and socket server run on Render's free tier, which spins down after 15 minutes of inactivity. The first request after idle time may take 30–60 seconds to respond while the service wakes up.

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

**Backend:** Node.js, Express 5, MongoDB with Mongoose 9, JWT authentication, bcryptjs, Cloudinary (image uploads), Brevo (transactional email), Stripe & PayPal payments, Socket.IO

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
- Brevo account (transactional email — free tier, no card required)

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

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_brevo_sender_email

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

## Deployment

Deployed using the following setup:

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend API | Render (Free tier) |
| Socket server | Render (Free tier) |
| Database | MongoDB Atlas |

**Key deployment notes:**
- Backend `NODE_ENV` set to `PRODUCTION`
- Backend forces IPv4 DNS resolution (`dns.setDefaultResultOrder("ipv4first")` in `server.js`) — some hosting environments have unreliable outbound IPv6 routing, which can otherwise cause `ENETUNREACH` errors when connecting to third-party APIs (Cloudinary, etc.)
- Transactional email uses Brevo's HTTP API rather than SMTP — Render's free tier blocks outbound SMTP ports (25/465/587) to prevent spam abuse, so a traditional Nodemailer/SMTP setup will silently time out on Render's free instances
- CORS `origin` in `backend/app.js` explicitly allowlists the deployed frontend URL, and Socket.IO's own CORS config (separate from Express's `cors()` middleware) is also set on the socket server
- Frontend `server`/`backend_url` constants point at the deployed backend URL with `/api/v2` appended for API calls
- Vercel builds fail if `CI=true` (its default) treats ESLint warnings as build errors — set `CI=false` as an environment variable in the Vercel project settings if this occurs

## Known Limitations

- Render's free-tier services spin down after 15 minutes idle; the first request after inactivity is slow while the instance wakes up
- Not all product categories (Gifts, Pet Care, Music and Gaming) have seeded demo data

## License

This project was built as part of a learning course (Becodemy Multi-Vendor MERN E-commerce tutorial) and is intended for educational purposes.