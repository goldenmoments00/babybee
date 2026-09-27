import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function run() {
  const email = "admin@babybee.com";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (existing) {
    console.log("Admin already exists!");
    return;
  }

  await prisma.user.create({
    data: {
      email,
      password_hash: hashedPassword,
      role: "SUPER_ADMIN"
    }
  });

  console.log("Admin account created! Email:", email, "Password:", password);
}
run();
