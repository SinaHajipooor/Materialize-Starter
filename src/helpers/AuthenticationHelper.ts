import { serialize } from "cookie";

// remove cookie and redirect user into login page if he got 401 from api
export async function handleAuthenticationError(context: any, error: any) {
    // 401 redirect login page
    if (error.response && error.response.status === 401) {


        context?.res.setHeader('Set-Cookie', [
            serialize('next-auth.session-token', '', {
                maxAge: -1,
                path: '/',
            }),
        ]);


        return {
            redirect: {
                destination: `/auth/login`,
                permanent: true,

            },
        };
    }

    // 404
    else if (error.response && error.response.status === 404) {

        return {
            props: {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            },
        };
    }

    // 403
    else if (error.response && error.response.status === 403) {

        return {
            props: {
                redirect: {
                    destination: '/401',
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