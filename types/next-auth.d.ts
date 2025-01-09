// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            accessToken: string
        } & DefautSession["user"]
    }

    interface JWT {
        accessToken: string;
        id: string;
    }
}

