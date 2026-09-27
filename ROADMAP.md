# BabyBee Custom E-Commerce Platform — Master Roadmap

**Project:** BabyBee  
**Project Type:** Custom-coded E-Commerce Web Application  
**Primary Goal:** Build a production-ready BabyBee online store with a customer-facing shopping experience and a secure, powerful Admin/CRM Panel.

> This roadmap is based primarily on the 11-page WebInnovex 360 quotation dated 25 September 2026. It converts the quotation into an execution plan for Antigravity. It does not treat third-party integrations or charges as automatically included.

---

## 1. PRODUCT VISION

BabyBee should become a complete online shopping platform for baby and kids products.

The system must have two major applications:

1. **Customer Storefront**
2. **Protected Admin/CRM Panel**

The platform should be custom-coded and scalable rather than a basic template/WordPress-style store.

The developer quotation specifies:
- Custom-coded application
- Desktop + mobile-oriented experiences
- Product catalogue
- Categories/subcategories
- Product variants
- Cart and wishlist
- Customer accounts
- Checkout
- Online payment + COD
- Order tracking
- Inventory management
- Coupons
- Customer management
- Revenue tracking
- Website traffic monitoring
- WhatsApp notifications
- BeeBuddy AI helper
- Promotional graphics/banners
- Shipping integration support
- Source-code/database/admin handover

---


---

# MOBILE-FIRST DESIGN — NON-NEGOTIABLE REQUIREMENT

**Mobile is the primary BabyBee shopping experience.**

Most BabyBee customers are expected to access the store from smartphones. Therefore, the website must not be designed as a desktop website that is merely made responsive.

The mobile experience must be designed **first**, tested **first**, and optimized **first**.

## Mobile UX Principles

- Mobile-first architecture and UI decisions.
- Extremely clean, premium and polished mobile experience.
- Fast loading on normal Indian mobile networks.
- Thumb-friendly controls and navigation.
- Large, comfortable tap targets.
- Simple one-hand browsing wherever practical.
- Minimal unnecessary text and visual clutter.
- Clear product pricing and discounts.
- Easy variant selection.
- Easy Add to Cart and Buy Now actions.
- Sticky/mobile-friendly shopping actions where appropriate.
- Mobile-optimized search.
- Mobile-friendly filters and sorting.
- Bottom navigation may be used where it improves usability.
- Checkout must require minimal steps.
- Forms must be easy to complete on a phone.
- Avoid tiny fonts, cramped spacing and desktop-style tables.
- Avoid unnecessary popups that interfere with shopping.
- Images must be optimized for mobile without visibly reducing quality.
- Product cards must remain clean and readable on small screens.
- Touch interactions must feel natural.
- Loading, empty, success and error states must all be designed for mobile.
- The Admin Panel should also be responsive, but the customer storefront has the highest mobile UX priority.

## Mobile Performance

The customer storefront should prioritize:
- Fast first load
- Optimized images
- Lazy loading where appropriate
- Minimal JavaScript shipped to the initial page
- Efficient API requests
- Caching where appropriate
- Optimized database queries
- Avoiding unnecessary animations
- Avoiding heavy third-party scripts

Performance must be tested on realistic mobile conditions, not only a high-end desktop or fast Wi-Fi connection.

## Mobile Acceptance Standard

A feature is not considered complete merely because it works on desktop.

Before marking customer-facing features as DONE, verify them on a phone-sized viewport and, where possible, an actual mobile device.

At minimum test:
- Home
- Navigation
- Category browsing
- Search
- Filters
- Product page
- Image gallery
- Variant selection
- Add to Cart
- Cart
- Wishlist
- Login/register
- Address entry
- Checkout
- Payment
- Order tracking

**Primary principle:**

> BabyBee should feel like a premium, modern mobile shopping app even though it is delivered as a web application.

Desktop should complement the mobile experience, not dictate it.

# 2. CORE BUSINESS MODULES

## Customer Store

### Home
- BabyBee branding
- Hero/promotional banners
- Featured categories
- Featured products
- New arrivals
- Offers
- Recommended/related products
- Promotional sections
- Footer with business/contact information

### Catalogue
- Categories
- Subcategories
- Product listing
- Search
- Filters
- Sorting
- Pagination/infinite loading as appropriate
- Product availability

### Product
Every product should support, where applicable:
- Product name
- SKU
- Product images
- Description
- Category
- Subcategory
- Price
- MRP
- Discount
- Stock
- Variants
- Size
- Colour
- Product status
- Related/recommended products

### Shopping
- Add to cart
- Quantity update
- Remove from cart
- Wishlist
- Stock validation
- Coupon application
- Automatic price calculation
- Shipping calculation where applicable

### Customer Account
- Register
- Login/logout
- OTP verification where configured
- Profile
- Saved addresses
- Order history
- Order details
- Wishlist

### Checkout
- Customer details
- Billing/shipping address
- Order summary
- Coupon
- Shipping
- Payment
- COD
- Online payment
- Order confirmation

### Order Tracking
Order lifecycle:

PLACED
→ RECEIVED
→ CONFIRMED
→ PROCESSING
→ SHIPPED
→ OUT FOR DELIVERY
→ DELIVERED

Also support:
- CANCELLED
- Appropriate payment failure states
- Return/refund states if implemented in a later phase

---

# 3. ADMIN / CRM PANEL

The Admin Panel is a first-class part of the application, not an afterthought.

## Dashboard
Show:
- Total orders
- Total sales/revenue
- Pending orders
- Confirmed orders
- Processing orders
- Shipped orders
- Delivered orders
- Cancelled orders
- Customer overview
- Product overview
- Low-stock products
- Recent orders
- Sales/revenue charts
- Basic traffic information

## Product Management
Admin can:
- Add product
- Edit product
- Delete/archive product
- Upload multiple images
- Manage categories
- Manage subcategories
- Manage variants
- Set pricing
- Set stock
- Set product status
- Mark featured
- Configure low-stock threshold

## Inventory
- Current stock
- Stock availability
- Stock adjustment
- Stock history
- Low-stock identification
- Out-of-stock status
- Automatic low-stock alerts
- Configurable low-stock threshold

## Orders
- View all orders
- Search/filter orders
- View order details
- Confirm
- Process
- Ship
- Mark out for delivery
- Deliver
- Cancel
- Handle COD orders
- Handle online-payment orders
- Add shipment/tracking information
- View customer information
- View payment status

## Customers
- Customer list
- Customer profile
- Customer contact information
- Address information
- Order history
- Basic customer activity

## Coupons
Support:
- Coupon code
- Percentage discount
- Fixed discount
- Minimum order value
- Maximum discount
- Expiry date
- Total usage limit
- Per-customer usage limit
- Active/inactive status

## Revenue / Reports
- Sales overview
- Revenue tracking
- Order-based revenue
- Basic sales statistics
- Date-based revenue analysis

## Website Traffic
Subject to implementation/provider:
- Current visitors/active users
- Traffic overview
- Visitor activity
- Page/activity monitoring
- Basic traffic statistics

## Content / Banners
Admin should eventually be able to manage:
- Homepage banners
- Promotional graphics
- Offer banners
- Campaign banners
- Featured products/categories

---

# 4. BABYBEE PRODUCT CATEGORIES

Initial catalogue should be designed so categories can be changed from Admin.

Potential starting structure:

- Baby Clothing
- Kids Clothing
- Baby Essentials
- Soft Toys
- Toys
- RC Cars
- Action Figures
- Gifts / Gift Packs
- Baby Furniture
- Newborn / Hospital Kits

**Important:** Do not hard-code these categories into the frontend. Categories and subcategories must be database-driven and manageable from Admin.

---

# 5. INVENTORY & PRODUCT DATA DESIGN

Design the database so one product can have multiple variants.

Example:

Product:
> Baby Dress

Variants:
- 0–3 Months / Pink
- 3–6 Months / Pink
- 6–12 Months / Pink
- 0–3 Months / Yellow

Each sellable variant should be able to have its own:
- SKU
- Price
- Stock
- Optional barcode
- Optional image
- Variant attributes

The architecture must avoid creating separate unrelated products when variants are actually the same product.

---

# 6. ORDER & PAYMENT ARCHITECTURE

## Order states

Use a controlled state machine rather than arbitrary text.

Suggested states:
- PENDING
- CONFIRMED
- PROCESSING
- SHIPPED
- OUT_FOR_DELIVERY
- DELIVERED
- CANCELLED

Payment states should be separate:
- PENDING
- PAID
- FAILED
- COD_PENDING
- REFUNDED

Do not mix order status and payment status.

## Payment

The quotation includes:
- UPI
- Debit/Credit Card
- Net Banking
- Other supported gateway methods
- COD

The exact payment gateway/provider must be finalized before integration.

Third-party gateway transaction fees are outside the quoted development cost.

---

# 7. WHATSAPP NOTIFICATIONS

The quotation proposes:

### Admin notification
New order:
- Order ID
- Customer
- Amount
- Payment method
- Admin-panel instruction

### Customer notifications
- Order confirmation
- Shipping notification
- Delivery notification
- Cancellation notification

WhatsApp Business Platform/API integration depends on the final provider, credentials, approvals and external messaging charges.

Build WhatsApp as a service/module so it can be replaced without rewriting order logic.

---

# 8. SHIPPING

The quotation allows shipping/courier API integration where required.

Architecture should support:
- Shipping charge calculation
- Shipment creation
- Tracking number
- Courier/provider
- Tracking status
- Delivery status

Do not hard-code one courier into the core order system.

The exact shipping provider must be finalized before live integration.

Third-party shipping API/provider charges are separate.

---

# 9. BEEBUDDY AI

The quotation includes a BabyBee-specific 24×7 AI helper.

Initial scope:
- Common customer questions
- Product information
- Shopping assistance
- Website navigation
- General BabyBee information
- Basic order information where technically supported

The AI should NOT have unrestricted access to sensitive admin functions.

Design it with:
- Read-only customer-safe tools
- Controlled knowledge/data sources
- Authentication before exposing private order information
- Rate limits
- Server-side API keys
- Clear fallback when information is unavailable

AI API/token charges are external charges.

---

# 10. SECURITY

Required baseline:

- Secure authentication
- Password hashing
- Protected Admin Panel
- Role-based access where applicable
- API validation
- Input validation
- Secure database access
- Environment variables for secrets
- No API keys in frontend
- Protected payment credentials
- Protected WhatsApp credentials
- Protected AI credentials
- Rate limiting where appropriate
- Secure session/token handling
- Audit-friendly admin actions

The quotation specifically requires protected Admin access, authentication, password hashing, API validation and environment-based secret management.

---

# 11. ADMIN ROLES

Initial architecture should support roles even if BabyBee starts with one administrator.

Suggested roles:

### Super Admin
Full access.

### Admin
Store/order/product/customer management.

### Staff
Restricted operational access.

The final role permissions should be configurable later.

Do not build the database in a way that assumes there can only ever be one admin.

---

# 12. TECHNOLOGY BASELINE

Developer quotation:

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Responsive UI
- REST API integration

### Backend
- Node.js
- Express.js
- RESTful APIs
- Secure authentication
- Business logic

### Database
- PostgreSQL
- Relational data model
- Secure data management

### Integrations
- Payment Gateway API
- WhatsApp Business Platform/API
- Shipping API where required
- AI API where required
- Cloud deployment

### Development
- Version-controlled source code
- Environment-based secrets
- Separate development/production configuration

Antigravity should maintain a clean, modular project structure and avoid unnecessary dependencies.

---

# 13. DATABASE MODULES

The database should be designed before building business logic.

Core entities should include approximately:

- users
- roles
- permissions
- customer_profiles
- addresses
- categories
- subcategories
- products
- product_images
- product_variants
- variant_attributes
- inventory
- inventory_movements
- carts
- cart_items
- wishlists
- wishlist_items
- coupons
- coupon_usage
- orders
- order_items
- payments
- shipments
- order_status_history
- notifications
- banners
- admin_activity/audit_logs
- site_settings

Additional tables can be added only when required by confirmed features.

---

# 14. API STRUCTURE

Use modular REST APIs.

Example groups:

/api/auth
/api/users
/api/customers
/api/categories
/api/products
/api/inventory
/api/cart
/api/wishlist
/api/coupons
/api/orders
/api/payments
/api/shipments
/api/notifications
/api/banners
/api/admin
/api/reports
/api/traffic
/api/ai

Protect private/admin routes with authentication and authorization middleware.

---

# 15. PROJECT PHASES

## PHASE 0 — REQUIREMENTS FREEZE
**Goal:** Decide exactly what is being built.

Tasks:
- Confirm features
- Confirm categories
- Confirm product data structure
- Confirm variants
- Confirm order statuses
- Confirm payment provider
- Confirm shipping provider
- Confirm WhatsApp method
- Confirm AI scope
- Confirm admin roles
- Confirm domain/hosting
- Confirm BabyBee branding assets

Deliverable:
`PROJECT_REQUIREMENTS.md`

---

## PHASE 1 — PROJECT FOUNDATION

Tasks:
- Create repository
- Configure frontend
- Configure backend
- Configure PostgreSQL
- Configure environment variables
- Configure development/production environments
- Establish folder structure
- Establish API conventions
- Establish error handling
- Establish logging
- Establish authentication architecture

Deliverable:
Working skeleton application.

---

## PHASE 2 — DATABASE & BACKEND

Tasks:
- Design database
- Create migrations
- Create models
- Seed initial admin
- Build authentication
- Build authorization
- Build category APIs
- Build product APIs
- Build inventory APIs
- Build customer APIs

Deliverable:
Functional backend foundation.

---

## PHASE 3 — CUSTOMER STOREFRONT
*(Mobile-first UI implemented continuously)*

Tasks:
- Home
- Header/navigation
- Categories
- Product listing
- Search
- Filters
- Product detail
- Variants
- Cart
- Wishlist
- Customer registration/login
- Profile
- Address management

Deliverable:
Customer can browse products and build a cart.

---

## PHASE 4 — CHECKOUT & ORDERS

Tasks:
- Checkout
- Address selection
- Coupon
- Shipping calculation
- Order creation
- COD
- Payment gateway integration
- Payment verification
- Order confirmation
- Order history
- Order tracking

Deliverable:
Complete customer purchase flow.

---

## PHASE 5 — ADMIN PANEL

Tasks:
- Admin login
- Dashboard
- Product CRUD
- Category CRUD
- Variant management
- Inventory
- Low-stock alerts
- Order management
- Customer management
- Coupon management
- Banner/content management
- Reports

Deliverable:
BabyBee can operate the store from Admin.

---

## PHASE 6 — NOTIFICATIONS & SHIPPING

Tasks:
- Email notification foundation if required
- WhatsApp integration
- Admin order notification
- Customer order notification
- Shipping integration
- Tracking information
- Delivery status synchronization where supported

Deliverable:
Automated operational communication.

---

## PHASE 7 — BEEBUDDY AI

Tasks:
- AI service layer
- BabyBee knowledge source
- Customer-safe tools
- Product Q&A
- Shopping assistance
- Order information after authentication
- Safety/fallback handling

Deliverable:
Functional BabyBee AI helper.

---

## PHASE 8 — BRANDING & THEME POLISH

Apply BabyBee visual identity (Mobile-first UI already handled in Phase 3):

- Original BabyBee logo
- Creamy ivory/off-white base
- Warm beige/natural tan neutrals
- Subtle peach/blush warmth
- Soft golden/orange accents
- Warm natural daylight feel
- Soft shadows
- Premium pastel appearance
- Avoid noticeable blue/cool colour cast
- Clean, uncluttered layouts

Do NOT recreate or redraw the BabyBee logo.

Use the original supplied BabyBee logo artwork exactly as provided.

---

## PHASE 9 — TESTING

### Customer tests
- Registration
- Login
- OTP
- Product browsing
- Search
- Filters
- Variant selection
- Cart
- Wishlist
- Coupon
- COD
- Online payment
- Checkout
- Order tracking
- Mobile responsiveness

### Admin tests
- Login
- Product CRUD
- Inventory
- Low stock
- Orders
- Customers
- Coupons
- Reports
- Banners
- Role permissions

### Security tests
- Unauthorized admin access
- API authorization
- Input validation
- Secret exposure
- Authentication
- Payment verification
- Rate limiting

### Edge cases
- Out-of-stock during checkout
- Product price changed after cart
- Duplicate payment callback
- Failed payment
- Cancelled order
- Invalid coupon
- Expired coupon
- Invalid variant
- Network failure
- Duplicate order submission

---

# 16. PERFORMANCE & QUALITY

Before launch:

- Mobile performance
- Desktop performance
- Image optimization
- Lazy loading where appropriate
- API response optimization
- Database indexing
- Error monitoring
- SEO-friendly product/category URLs
- Metadata
- Sitemap
- Robots configuration
- Accessibility basics
- 404/500 pages

---

# 17. DEPLOYMENT

Production environment should include:

- Domain
- HTTPS
- Frontend deployment
- Backend deployment
- PostgreSQL database
- Environment secrets
- Database backups
- Logging
- Monitoring
- Payment gateway production credentials
- WhatsApp production credentials
- Shipping credentials
- AI credentials

Do not put production secrets in Git.

---

# 18. OWNERSHIP & HANDOVER

Before final acceptance, BabyBee must receive:

- Complete source code
- Database access/details
- Admin access
- Deployment access as applicable
- Environment/configuration documentation
- API/integration documentation
- Setup instructions
- Backup/restore instructions

The developer quotation explicitly includes source code, database and admin handover.

---

# 19. THIRD-PARTY COSTS

The development quotation does NOT automatically mean these external services are free.

Potential external costs include:
- Domain
- Hosting/server
- SMS/OTP
- AI API/token usage
- Payment gateway transaction charges
- Email service
- WhatsApp/Meta messaging
- WhatsApp provider
- Premium cloud storage
- Shipping/courier API
- Other third-party services

These should be recorded separately from development cost.

---

# 20. ANTIGRAVITY WORKING RULES

Antigravity must follow these rules:

1. Do not build the entire application in one uncontrolled step.
2. Work phase-by-phase.
3. Read this roadmap before every major phase.
4. Never silently remove a required feature.
5. Never hard-code business data that should be managed by Admin.
6. Keep frontend, backend and database concerns separated.
7. Keep secrets server-side.
8. Use migrations for database changes.
9. Keep APIs documented.
10. Add validation to all important inputs.
11. Add loading, empty, error and success states to UI.
12. Make mobile experience a first-class requirement.
13. Do not use fake payment success in production.
14. Do not expose admin APIs to public users.
15. Keep third-party integrations modular.
16. Write reusable components/services.
17. Avoid unnecessary dependencies.
18. Do not modify the original BabyBee logo.
19. Do not mark a phase complete until its acceptance tests pass.
20. Before major changes, inspect existing code and preserve working functionality.

---

# 21. DEFINITION OF DONE

A feature is DONE only when:

- UI is implemented
- Backend/API is implemented where required
- Database changes are implemented
- Validation exists
- Error states exist
- Mobile behavior is checked
- Authentication/authorization is correct
- Relevant edge cases are tested
- No console/build errors remain
- Documentation is updated
- Acceptance criteria pass

---

# 22. TODAY EVENING — STARTING SEQUENCE

Start in this order.

### STEP 1
Create the Antigravity project and repository.

### STEP 2
Create:
- `ROADMAP.md`
- `PROJECT_REQUIREMENTS.md`
- `TECHNICAL_ARCHITECTURE.md`
- `DATABASE_SCHEMA.md`
- `API_SPEC.md`
- `CHANGELOG.md`

### STEP 3
Review this roadmap and identify unresolved decisions.

### STEP 4
Freeze Phase 0 requirements.

### STEP 5
Design the database before implementing the complete storefront.

### STEP 6
Create the project skeleton.

### STEP 7
Implement authentication and Admin foundation.

### STEP 8
Implement product/category/inventory backend.

### STEP 9
Build the customer catalogue.

Do not jump directly to payment, WhatsApp or AI before the core product/order architecture is stable.

---

# 23. FIRST MILESTONE

The first milestone is NOT "finish the website."

The first milestone is:

> **A clean, working BabyBee e-commerce foundation with database architecture, authentication, Admin foundation, product/category/inventory APIs, and a customer storefront foundation.**

Once this is stable, continue to cart → checkout → orders → payments → shipping → WhatsApp → AI → production deployment.

---

# 24. BABYBEE BUSINESS DETAILS

Use these confirmed project details:

**Brand:** BabyBee  
**Tagline:** From Little Ones to Loved Ones  
**Business phone / WhatsApp:** 9863191310  
**Location:** Agartala, Tripura

The original BabyBee logo supplied by the owner must be treated as a protected brand asset and used without redesigning it.

---

# 25. MASTER PRINCIPLE

Build BabyBee as a real commerce platform that the owner can operate independently.

The goal is not merely to produce a visually attractive website.

The goal is:

**Customer → Browse → Select Variant → Cart → Checkout → Payment/COD → Order → Admin → Inventory → Shipping → Notification → Delivery → Reporting**

Every part of this chain must work together reliably.

