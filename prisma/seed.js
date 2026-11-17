
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 1. Admin account details
  const adminName = "BatoKhula Admin";
  const adminEmail = "admin@batokhula.com";
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 2. Validate password
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is missing from .env");
  }

  // 3. Hash Admin password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // 4. Check whether Admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  // 5. Create Admin if not already registered
  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created successfully!");
  console.log("Admin email:", admin.email);
}

// 6. Execute main function
main()
  .catch((error) => {
    console.error("Error creating Admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Database Disconnected.");
  });
