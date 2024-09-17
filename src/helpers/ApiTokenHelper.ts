import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import { options } from "src/pages/api/auth/options";
import { setAuthToken } from "src/utils/axios/axios";

// get token from session 
export async function getApiToken(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, options);
    const token: string = session?.myToken;
    setAuthToken(token);

    return session;
}