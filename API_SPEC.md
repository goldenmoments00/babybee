# API Specification: BabyBee

Modular REST API structure for the Node.js/Express backend, designed for consumption by the Next.js frontend and potential future native mobile apps.

## API Versioning
All endpoints are prefixed with `/api/v1/`.

## 1. Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Customer registration
- `POST /api/v1/auth/login` - Login (Admin & Customer)
- `POST /api/v1/auth/logout` - Invalidate session/token
- `POST /api/v1/auth/otp/send` - Send OTP via OtpService
- `POST /api/v1/auth/otp/verify` - Verify OTP
- `GET /api/v1/auth/me` - Get current authenticated user

## 2. Users & Customers (`/api/v1/customers`)
- `GET /api/v1/customers/profile` - Get customer profile
- `PUT /api/v1/customers/profile` - Update profile
- `GET /api/v1/customers/addresses` - List saved addresses
- `POST /api/v1/customers/addresses` - Add new address
- `PUT /api/v1/customers/addresses/:id` - Update address
- `DELETE /api/v1/customers/addresses/:id` - Delete address

## 3. Catalogue (`/api/v1/categories`, `/api/v1/products`)
- `GET /api/v1/categories` - List active categories with subcategories
- `GET /api/v1/products` - List products (Optimized for small mobile payloads)
- `GET /api/v1/products/:slug` - Get product details and variants
- `GET /api/v1/products/featured` - Get featured products

## 4. Shopping (`/api/v1/cart`, `/api/v1/wishlist`)
- `GET /api/v1/cart` - Get current cart
- `POST /api/v1/cart` - Add item to cart
- `PUT /api/v1/cart/:itemId` - Update item quantity
- `DELETE /api/v1/cart/:itemId` - Remove item from cart
- `POST /api/v1/cart/apply-coupon` - Validate and apply coupon
- `GET /api/v1/wishlist` - Get user wishlist
- `POST /api/v1/wishlist` - Add product to wishlist
- `DELETE /api/v1/wishlist/:productId` - Remove product from wishlist

## 5. Checkout & Orders (`/api/v1/orders`, `/api/v1/payments`)
- `POST /api/v1/orders/checkout` - Create order from cart
- `GET /api/v1/orders` - Get customer order history
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/payments/initiate` - Initialize payment gateway session

## 6. Webhooks (`/api/v1/webhooks`) - Idempotent Endpoints
- `POST /api/v1/webhooks/payments` - Callback for payment success/failure
- `POST /api/v1/webhooks/shipping` - Callback for shipping status updates

## 7. Admin Panel (`/api/v1/admin/*` - Protected Routes)
- `GET /api/v1/admin/dashboard` - Get overall stats
- `GET/POST/PUT/DELETE /api/v1/admin/categories` - Manage categories
- `GET/POST/PUT/DELETE /api/v1/admin/products` - Manage products and variants (Soft Deletes via PUT/DELETE)
- `GET/POST/PUT /api/v1/admin/inventory` - Manage stock levels
- `GET /api/v1/admin/orders` - View all orders
- `PUT /api/v1/admin/orders/:id/status` - Update order status
- `GET /api/v1/admin/customers` - View customer list
- `GET/POST/PUT/DELETE /api/v1/admin/coupons` - Manage coupons
- `GET/POST/PUT/DELETE /api/v1/admin/banners` - Manage promotional banners
- `GET /api/v1/admin/reports` - Get sales reports

## 8. Third-Party Integrations (`/api/v1/ai`, `/api/v1/shipping`, `/api/v1/analytics`)
- `POST /api/v1/ai/chat` - Interact with BeeBuddy AI
- `GET /api/v1/shipping/estimate` - Get shipping cost estimate
- `GET /api/v1/shipping/track/:trackingNumber` - Get tracking info
- `POST /api/v1/analytics/event` - Record custom e-commerce event via abstract AnalyticsService

---

## ARCHITECTURE DECISIONS — APPROVED
* `/api/v1/` prefix enforced
* Idempotent webhook design
* Mobile-optimized small payloads
* Abstract endpoints for Analytics, OTP, AI
