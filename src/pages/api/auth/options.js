import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "src/libs/auth/auth";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const userInfo = {
                    "username": credentials.username,
                    "password": credentials.password
                }

                const userData = await login(userInfo)

                if (userData.token) {

                    return { ...userData, apiToken: userData.token, encryptedUsername: userData?.encrypted_username, myToken: userData.token, roles: userData?.role, permissions: userData?.permissions }
                }
            },

        }),
    ],

    callbacks: {

        async session({ session, token }) {
            const myToken = token.apiToken
            session.myToken = myToken

            return {
                ...session, user: token
            }

        },

        async jwt({ token, user, session, trigger }) {

            if (trigger === 'update') {
                return { ...token, ...session?.user }
            }

            if (user) {
                return {
                    ...token, ...user
                }
            }

            return token
        },


    },
    pages: {
        signIn: '/auth/login',
    },
    session: {
        maxAge: 60 * 60 * 6,
    },
}



