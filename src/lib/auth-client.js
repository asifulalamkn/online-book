import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://online-book-zeta.vercel.app"
})

