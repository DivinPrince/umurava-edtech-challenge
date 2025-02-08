import { env } from "@/env";
import db from "@/lib/db";

import { generateId } from "better-auth";
import { hashPassword } from "better-auth/crypto";

const createAdmin = async () => {
  try {
    console.log("Creating admin user...");
    
    const adminEmail = "admin@umurava.africa";
    const adminPassword = env.ADMIN_PASSWORD;
    
    // Hash the password
    const hashedPassword = await hashPassword(adminPassword);

    const user = await db.user.create({
      data: {
        id: generateId(),
        name: "Umurava Admin",
        email: adminEmail,
        emailVerified: true,
        role: "admin",
        skills: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("Admin user created successfully! ", user);
    // Create the account
    await db.account.create({
      data: {
        id: generateId(),
        userId: user.id,
        accountId: generateId(),
        providerId: "credentials",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("Admin Account created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdmin();