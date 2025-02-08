import env from "@/env";
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const auth = createAuthClient({
    baseURL: env.NEXT_PUBLIC_AUTH_ENDPOINT,
    plugins: [adminClient()]
})

export const { signUp, signIn, signOut, useSession, getSession } = auth;
export default auth;