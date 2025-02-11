import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";
import { admin } from "better-auth/plugins"
import { env } from "@/env";

export const auth = betterAuth({
    trustedOrigins: [
        env.APP_ORIGIN,
        "https://umurava-edtech.vercel.app"
    ],
    auth: {
        emailAndPassword: {
            enabled: true,
            autoSignIn: true
        }
    },
    advanced: {
        useSecureCookies: true,
        crossSubDomainCookies: {
            enabled: true,
            domain: env.NODE_ENV === "production" ? "umurava-edtech.dimestore.app" : "localhost"
        },
        cookies: {
            session_token: {
                attributes: {
                    sameSite: "none",    
                    secure: true,
                    domain: env.NODE_ENV === "production" ? ".umurava-edtech.dimestore.app" : "localhost",
                    partitioned: true
                }
            }
        }
    },
    database: prismaAdapter(db, {
        provider: "mongodb",
    }),
    plugins: [admin()],
    emailAndPassword: {
        enabled: true,
    },
});
