import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const queryClientSetup = (router: any) => new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: 1,
            useErrorBoundary(error: any) {
                if (error?.response?.status === 401) {
                    signOut({ redirect: false });
                    router.replace(`/auth/login`, undefined, { shallow: true });
                }
                else if (error?.response?.status === 500) {
                    router.replace(`/500`, undefined, { shallow: true });
                }

                return false
            },
        },
    },
});

export default queryClientSetup;
