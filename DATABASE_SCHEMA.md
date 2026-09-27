# Database Schema: BabyBee

Proposed relational database entities (PostgreSQL) using Prisma ORM.

## Users & Access
- `users` (id, email, password_hash, role_id, created_at, updated_at)
- `roles` (id, name, description)
- `permissions` (id, name)
- `role_permissions` (role_id, permission_id)

## Customer Data
- `customer_profiles` (id, user_id, first_name, last_name, phone, dob)
- `addresses` (id, user_id, type (billing/shipping), street, city, state, pin_code, country, is_default)

## Product Catalogue
- `categories` (id, name, slug, description, image_url, is_active)
- `subcategories` (id, category_id, name, slug, is_active)
- `products` (id, subcategory_id, name, slug, description, base_price, status, is_featured, created_at, deleted_at)
- `product_images` (id, product_id, image_url, sort_order, is_primary)
- `product_variants` (id, product_id, sku, price, mrp, stock, low_stock_threshold, status, barcode, image_url, deleted_at)
- `variant_attributes` (id, variant_id, attribute_name (e.g., 'Size', 'Colour'), attribute_value)
- *Note on Variants*: Core searchable attributes use relational tables. JSONB is reserved ONLY for highly flexible, miscellaneous data (if absolutely needed).

## Inventory Management
- `inventory_movements` (id, variant_id, type (IN/OUT/ADJUST), quantity, reference_id, notes, created_at)

## Shopping & Promotions
- `carts` (id, user_id, session_id, created_at, updated_at)
- `cart_items` (id, cart_id, variant_id, quantity)
- `wishlists` (id, user_id)
- `wishlist_items` (id, wishlist_id, product_id)
- `coupons` (id, code, type (PERCENTAGE/FIXED), value, min_order_value, max_discount, expiry_date, usage_limit, per_user_limit, is_active)
- `coupon_usage` (id, coupon_id, user_id, order_id, used_at)

## Orders & Checkout
- `orders` (id, user_id, order_number, total_amount, discount_amount, shipping_amount, final_amount, status, shipping_address_id, billing_address_id, coupon_id, created_at)
- `order_items` (id, order_id, variant_id, quantity, price_at_time, total_price)
- `order_status_history` (id, order_id, status, notes, changed_by, created_at)
- `payments` (id, order_id, payment_method, transaction_id, amount, status, gateway_response, created_at)
- `shipments` (id, order_id, courier_name, tracking_number, status, shipped_at, delivered_at)

## System & Logs
- `notifications` (id, user_id, type, channel, content, is_read, created_at)
- `banners` (id, title, image_url, link_url, position, is_active, sort_order)
- `admin_activity_logs` (id, user_id, action, resource, resource_id, details, created_at)
- `site_settings` (key, value, description)

---

## Architecture Rules & Indexes

### 1. Data Preservation (Soft Deletes)
Historical orders must remain perfectly valid.
- `products` and `product_variants` use `deleted_at` for soft deletes.
- We NEVER physically delete a product or variant that is referenced by historical orders.

### 2. Indexes for Mobile Performance
To ensure fast load times and efficient queries on mobile networks, the following indexes MUST be applied:
- `slug` on `categories`, `subcategories`, `products`.
- `category_id` on `subcategories`.
- `subcategory_id` on `products`.
- `sku` on `product_variants`.
- `product_id` on `product_variants`, `product_images`, `wishlist_items`.
- `order_id` on `order_items`, `payments`, `shipments`, `order_status_history`.
- `user_id` on `orders`, `customer_profiles`, `addresses`, `carts`.

---

## ARCHITECTURE DECISIONS — APPROVED
* Prisma ORM
* `deleted_at` for soft-deleting products/variants
* `low_stock_threshold` on variants
* Explicit database indexes
* Separation of Order Status and Payment Status
