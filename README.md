# Course Platform

A Next.js course platform where users can purchase and watch coding video tutorials using Razorpay payment gateway.

## Features

- User authentication (register/login)
- Browse and search courses
- Purchase courses with Razorpay (real payment gateway)
- Watch unlisted YouTube videos after purchase
- Admin dashboard to add/delete courses
- MongoDB database integration
- Dynamic pricing per course (set by admin)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env.local`:
- MONGODB_URI: Your MongoDB connection string
- NEXTAUTH_SECRET: Random secret key
- RAZORPAY_KEY_ID: Your Razorpay Key ID
- RAZORPAY_KEY_SECRET: Your Razorpay Key Secret
- NEXT_PUBLIC_RAZORPAY_KEY_ID: Your Razorpay Key ID (public)
- ADMIN_EMAIL: Email for admin account

3. Get Razorpay credentials:
- Sign up at https://razorpay.com/
- Go to Settings > API Keys
- Generate Test/Live keys
- Add them to .env.local

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Admin Access

Register with the email specified in ADMIN_EMAIL to get admin privileges.
Admin can set custom price for each course (not fixed at $10).

## Payment

Uses Razorpay payment gateway for real transactions. Supports:
- Credit/Debit cards
- UPI
- Net Banking
- Wallets

## Tech Stack

- Next.js 14
- MongoDB with Mongoose
- NextAuth for authentication
- Razorpay for payments
- Tailwind CSS
- React Player for video playback
