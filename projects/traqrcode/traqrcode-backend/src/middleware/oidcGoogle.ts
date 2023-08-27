import {
    BACKEND_URL,
    OAUTH2_CLIENT_ID_GOOGLE,
    OAUTH2_CLIENT_SECRET_GOOGLE,
    OAUTH2_REDIRECT_PATH_GOOGLE
} from "../settings";
import {stringify} from "querystring";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    API_CODE,
    getBackendLoginGoogleUrl,
    getBackendLoginRedirectGoogleUrl,
    getFrontendOidcLoginCallbackUrl, PageEditErrors, PageWorker, PostResponseBase, User
} from "@hekori/traqrcode-common";
import {createIdToken} from "./auth";
import {pg} from "../database/pg";


const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://accounts.google.com/token'

const SCOPE = 'openid email'
const REDIRECT_URL = `${BACKEND_URL}${OAUTH2_REDIRECT_PATH_GOOGLE}`

export const oidcSetup = (api) => {

    // Google Documentation
    // https://developers.google.com/identity/openid-connect/openid-connect#python

    // OpenID Connect Documentation
    // https://openid.net/specs/openid-connect-core-1_0.html

    console.log('BACKEND_URL', BACKEND_URL)
    console.log('process.env.NX_BACKEND_URL', process.env.NX_BACKEND_URL)
    console.log('redirect_url', REDIRECT_URL)

    // -------------------
    // REDIRECT TO GOOGLE
    // ------------------
    api.get(getBackendLoginGoogleUrl(), (req, res) => {
        console.log(GOOGLE_AUTHORIZATION_URL);
        const url = `${GOOGLE_AUTHORIZATION_URL}?${stringify({
            client_id: OAUTH2_CLIENT_ID_GOOGLE,
            redirect_uri: REDIRECT_URL,
            access_type: 'offline',
            response_type: 'code',
            scope: SCOPE,
            state: 'random-state-string' // TODO: implement CSRF
        })}`;
        res.redirect(url);
    });


    // -------------------
    // CALLBACK FOR GOOGLE
    // ------------------
    api.get(getBackendLoginRedirectGoogleUrl(), async (request, reply) => {
        console.log('called redirect_uri')
        console.log('request', request)
        const { code, scope } = request.query;
        //
        console.log('request.query', request.query)


        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', stringify({
            code,
            client_id: OAUTH2_CLIENT_ID_GOOGLE,
            client_secret: OAUTH2_CLIENT_SECRET_GOOGLE,
            redirect_uri: REDIRECT_URL,
            grant_type: 'authorization_code'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('tokenResponse', tokenResponse.data)
        const { id_token } = tokenResponse.data;

        const decodedIdToken:any = jwt_decode(id_token)

        console.log('jwt_decode', decodedIdToken)

        const email = decodedIdToken?.email
        const emailVerified = decodedIdToken?.email_verified

        if(!emailVerified) reply.status(401).send({
            status: API_CODE.ERROR,
            errors: [API_CODE.ERROR_EMAIL_IS_NOT_VERIFIED]
        })

        // find user by email
        const user: User = await pg('user')
            .where({ email }).first()

        const idToken = createIdToken({userUuid: user.userUuid})

        // return reply.send({status: "OK"})
        return reply.redirect(getFrontendOidcLoginCallbackUrl(true, idToken))

    });




}

