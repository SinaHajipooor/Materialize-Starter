import { serialize } from "cookie";
import url from 'url';

// remove cookie and redirect user into login page if he got 401 from api
export async function handleAuthenticationError(context: any, error: any) {
    // 401
    if (error.response && error.response.status === 401) {
        const fullUrl = url.parse(context.req.url || '/');
        const currentRoute = fullUrl.pathname ? fullUrl.pathname.replace(/\/_next\/data\/development/, '').replace('.json', '') : '/';


        context?.res.setHeader('Set-Cookie', [
            serialize('next-auth.session-token', '', {
                maxAge: -1,
                path: '/',
            }),
        ]);


        return {
            redirect: {
                destination: `/auth/login?returnUrl=${currentRoute}`,
                permanent: true,

            },
        };
    }

    // 403
    if (error.response && error.response.status === 403) {

        return {
            props: {
                redirect: {
                    destination: '/401',
                    permanent: false,
                },
            },
        };
    }

    // 404
    if (error.response && error.response.status === 404) {

        return {
            props: {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            },
        };
    }

    // 500
    return {
        props: {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        },
    };
}