import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request) {
        if (request.nextUrl.pathname.startsWith('/auth') && request.nextauth.token) {
            return NextResponse.rewrite(
                new URL('/', request.url)
            )
        }
    },
    {
        callbacks: {
            //     authorized: ({ token }) => Boolean(token?.apiToken),
            authorized: () => true
        },
        pages: {
            'signIn': '/auth/login'
        },
    }
)


export const config = {
    matcher: ['/', '/admin/:path*']
}

