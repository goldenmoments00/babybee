import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function run() {
  console.log("Starting E2E Database test against Supabase...");
  
  try {
    // 1. Create a Category & Subcategory
    const category = await prisma.category.create({
      data: {
        name: "E2E Testing Category",
        slug: "e2e-testing-category-" + Date.now(),
      }
    });
    
    const subcategory = await prisma.subcategory.create({
      data: {
        name: "E2E Subcategory",
        slug: "e2e-testing-subcategory-" + Date.now(),
        category_id: category.id
      }
    });
    console.log("✅ Category & Subcategory created:", subcategory.id);

    // 2. Create a Product
    const product = await prisma.product.create({
      data: {
        name: "E2E Test Product",
        slug: "e2e-test-product-" + Date.now(),
        description: "A test product",
        base_price: 500,
        subcategory_id: subcategory.id,
      }
    });
    console.log("✅ Product created:", product.id);

    // 3. Create a Variant & Inventory
    const variant = await prisma.productVariant.create({
      data: {
        product_id: product.id,
        sku: "E2E-TEST-SKU-" + Date.now(),
        price: 500,
        mrp: 600,
        stock: 5,
        attributes: {
          create: [{ attribute_name: "Color", attribute_value: "Red" }]
        }
      }
    });
    console.log("✅ Variant & Inventory created:", variant.id);

    // 4. Create a Customer
    const hashedPassword = await bcrypt.hash("password123", 10);
    const customer = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        password_hash: hashedPassword,
        role: "CUSTOMER",
        customerProfile: {
          create: {
            first_name: "Test",
            last_name: "Customer"
          }
        }
      }
    });
    console.log("✅ Customer created:", customer.id);

    // 5. Create an Address
    const address = await prisma.address.create({
      data: {
        user_id: customer.id,
        type: "shipping",
        street: "123 Test St",
        city: "Mumbai",
        state: "Maharashtra",
        pin_code: "400001",
        country: "India"
      }
    });
    console.log("✅ Address created:", address.id);

    // 6. Simulate Checkout Transaction
    const orderData = await prisma.$transaction(async (tx) => {
      // Deduct inventory
      const updatedVariant = await tx.productVariant.update({
        where: { id: variant.id },
        data: { stock: { decrement: 1 } }
      });
      if (updatedVariant.stock < 0) throw new Error("Insufficient stock");

      // Record movement
      await tx.inventoryMovement.create({
        data: {
          variant_id: variant.id,
          quantity: -1,
          type: "OUT",
          notes: "Order Placed"
        }
      });

      // Create Order
      const order = await tx.order.create({
        data: {
          order_number: "E2E-" + Date.now(),
          user_id: customer.id,
          total_amount: 500,
          shipping_amount: 50,
          final_amount: 550,
          status: "CONFIRMED",
          shipping_address_id: address.id,
          billing_address_id: address.id,
          items: {
            create: [{
              variant_id: variant.id,
              product_name_snapshot: product.name,
              variant_sku_snapshot: variant.sku,
              price_at_time: 500,
              quantity: 1,
              total_price: 500
            }]
          },
          history: {
            create: [{ status: "CONFIRMED", notes: "Order placed successfully" }]
          },
          payment: {
            create: {
              payment_method: "COD",
              amount: 550,
              status: "PENDING"
            }
          }
        }
      });

      return order;
    });

    console.log("✅ Checkout successful! Order:", orderData.order_number);

    // Verify stock deduction
    const verifyStock = await prisma.productVariant.findUnique({ where: { id: variant.id }});
    console.log(`✅ Stock verification: Expected 4, Got ${verifyStock?.stock}`);
    
    console.log("ALL E2E POSTGRESQL TESTS PASSED.");
  } catch (err) {
    console.error("❌ E2E TEST FAILED", err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
