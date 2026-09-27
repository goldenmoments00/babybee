# Technical Architecture: BabyBee

## 1. High-Level Architecture
The BabyBee platform uses a decoupled client-server architecture with Server-Side Rendering (SSR) capabilities.
- **Frontend (Client/SSR)**: Next.js + React.js application handling Customer Storefront and Admin Panel interfaces. Next.js ensures fast mobile loading, excellent SEO, and optimized image delivery.
- **Backend (Server)**: Node.js + Express.js RESTful API handling core business logic, decoupled from the frontend.
- **Database**: PostgreSQL (relational structure for strict consistency of orders and inventory).

## 2. Technology Stack
- **Frontend**: Next.js, React, Tailwind CSS.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL.
- **ORM**: Prisma (Provides type-safe database queries and automated migrations).

## 3. Project Structure (Proposed)
```
babybee-ecommerce/
│
├── frontend/                 # Next.js application
│   ├── public/               # Static assets (including protected BabyBee Logo)
│   ├── src/
│   │   ├── app/              # Next.js App Router (Pages & Layouts)
│   │   ├── components/       # Reusable UI components (Mobile-first Tailwind)
│   │   ├── services/         # API client calls (fetch/axios)
│   │   ├── store/            # Global state management
│   │   └── utils/            # Helpers, formatters
│   └── tailwind.config.js    # Theme and branding configuration
│
├── backend/                  # Node.js + Express application
│   ├── prisma/               # Prisma schema and migrations
│   ├── src/
│   │   ├── config/           # Environment and DB config
│   │   ├── controllers/      # Request handling and response mapping
│   │   ├── middlewares/      # Auth, validation, error handling
│   │   ├── routes/           # API route definitions (/api/v1/...)
│   │   ├── services/         # Core business logic and Adapter Interfaces
│   │   │   ├── PaymentService/
│   │   │   ├── WhatsAppService/
│   │   │   ├── ShippingService/
│   │   │   ├── OtpService/
│   │   │   ├── AiService/
│   │   │   └── AnalyticsService/
│   │   └── index.js          # App entry point
│   └── .env                  # Secret configurations
│
└── README.md
```

## 4. Integration Architecture (Adapter Pattern)
To avoid vendor lock-in, all third-party integrations will use service interfaces.
- The core order system will call `PaymentService.createPaymentIntent()`.
- The `PaymentService` will internally route to the specific provider (e.g., Razorpay/Stripe) based on environment configuration.
- The same pattern applies to `WhatsAppService`, `ShippingService`, `OtpService`, `AiService`, and `AnalyticsService`.

## 5. Authentication & Authorization Architecture
- **Customer Auth**: Secure login supporting password and OTP-based verification (via `OtpService`).
- **Admin Auth (RBAC)**: Supports Super Admin, Admin, and Staff roles. Middleware checks role permissions on protected routes.
- **Secrets Management**: All API keys reside securely in the backend `.env` file and are never exposed to the frontend.

## 6. Mobile-First & Performance Strategy
- **Development Process**: Mobile-first UI designed and tested continuously starting from Phase 3. Desktop is treated as a secondary expansion.
- **Next.js Rendering**: Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for product catalogs to minimize client-side JS overhead.
- **Images**: Use Next.js `<Image />` component for automatic WebP conversion, resizing, and lazy loading.
- **API Payloads**: Keep JSON responses small (e.g., exclude heavy descriptions from list views).
- **Extensibility**: Architecture allows easy insertion of Redis caching later without major rewrites.

## 7. Webhook Architecture
- Dedicated idempotent webhook endpoints for payment and shipping updates.
- Processing logic will check existing transaction states to prevent duplicate order generation or redundant status changes.

---

## ARCHITECTURE DECISIONS — APPROVED
* Next.js + React + Tailwind CSS
* Node.js + Express + Prisma + PostgreSQL
* `/api/v1/` Versioning
* Adapter Pattern for 3rd Party Integrations
* Idempotent Webhooks
* Provider-independent Analytics
* OTP + RBAC Authentication
* Original BabyBee logo is a protected static asset
