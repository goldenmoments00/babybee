# Project Requirements: BabyBee

## A & B. Defined Requirements
The following requirements are clearly defined and approved:

### 1. Core Applications
- **Customer Storefront**: Mobile-first, responsive, fast-loading, clean and premium UI/UX. The mobile experience is the primary shopping experience. Priority: Mobile → Tablet → Desktop.
- **Admin/CRM Panel**: Protected, comprehensive dashboard for store management, scalable and role-based.

### 2. Business Details
- **Brand**: BabyBee ("From Little Ones to Loved Ones")
- **Contact**: 9863191310 (Phone/WhatsApp)
- **Location**: Agartala, Tripura
- **Branding**: Original logo to be preserved (protected static asset, never redraw/modify), creamy ivory/off-white base, warm beige/natural tan neutrals, subtle peach/blush warmth, soft golden/orange accents.

### 3. Customer Store Features
- **Home**: Hero banners, featured categories/products, new arrivals, offers, footer.
- **Catalogue**: Dynamic categories/subcategories (database-driven), search, filters, sorting, pagination.
- **Product Page**: SKU, multiple images, description, price, MRP, discount, stock, variants (Size, Colour), related products.
- **Shopping**: Cart, wishlist, stock validation, coupon application, dynamic pricing.
- **Account**: Registration, login, OTP support, profile, saved addresses, order history/details.
- **Checkout**: Address selection, order summary, coupon, shipping, COD + Online payment options, order confirmation.
- **Order Tracking**: Explicit state machine. Historical orders remain valid even if products are archived.

### 4. Admin Panel Features
- **Dashboard**: High-level statistics (orders, sales, stock, traffic).
- **Product Management**: Full CRUD, multiple images, categories, variants, pricing, stock thresholds.
- **Inventory**: Stock adjustment, history, low-stock alerts at the variant level.
- **Orders**: View, search, filter, update states, tracking info, payment status.
- **Customers**: View profiles, order history, addresses.
- **Coupons**: Management of discount codes, limits, expiries.
- **Reports**: Sales overview, revenue tracking.

### 5. Integrations & Notifications
- **WhatsApp**: Admin notifications (new orders) and customer notifications.
- **Shipping**: Dynamic shipping calculations, shipment creation, tracking webhooks.
- **AI Helper (BeeBuddy)**: Customer support chatbot, read-only tools, restricted order access, rate-limited.
- **Payment**: UPI, Debit/Credit, Net Banking, COD. Payment webhooks (idempotent).
- **Analytics**: Provider-independent analytics abstraction for tracking visitors, page views, and e-commerce events.

### 6. Security & Roles
- **Roles**: Super Admin, Admin, Staff (RBAC).
- **Security**: Password hashing, protected admin routes, environment variables for secrets, API validation, rate limiting.

---

## ARCHITECTURE DECISIONS — APPROVED

1. **Frontend**: Next.js + React + Tailwind CSS (SSR/SSG for fast mobile loading & SEO).
2. **Backend**: Node.js + Express.js + REST APIs + PostgreSQL.
3. **ORM**: Prisma (for schema management, migrations, and type-safety).
4. **API Versioning**: All APIs prefixed with `/api/v1/`.
5. **Database Corrections**: Soft deletes (`deleted_at`) for products and variants to preserve order history. `low_stock_threshold` on variants. Explicit indexing.
6. **Product Variants**: Strict relational fields for core attributes; JSONB only for flexible misc attributes.
7. **Order/Payment**: Order and payment statuses are completely decoupled.
8. **Mobile-First**: Mobile UI development starts in Phase 3. Continuous mobile testing required.
9. **Performance**: Leverage Next.js rendering, optimized images, lazy loading, DB indexes. Keep extensible for future caching.
10. **Analytics**: Provider-independent service abstraction.
11. **Authentication**: Supports secure customer auth + OTP, Admin RBAC. Not locked to one OTP provider.
12. **Third-Party Integrations**: Strict adapter/service interfaces (`PaymentService`, `WhatsAppService`, `ShippingService`, `OtpService`, `AiService`).
13. **Logo**: The original BabyBee logo is a protected static asset.

---

## C. Remaining Open Decisions (TO BE DECIDED)
- Exact final third-party providers (Payment Gateway, Shipping, WhatsApp API, AI API, Email, Domain/Hosting).
- Initial categories list to seed the database.
