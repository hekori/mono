import {
    BACKEND_URL,
    OAUTH2_CLIENT_ID_MICROSOFT, OAUTH2_CLIENT_SECRET_MICROSOFT, OAUTH2_REDIRECT_PATH_MICROSOFT,
} from "../settings";
import {stringify} from "querystring";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    API_CODE, getBackendLoginMicrosoftUrl,
    getBackendLoginRedirectMicrosoftUrl,
    getFrontendOidcLoginCallbackUrl,
    User
} from "@hekori/traqrcode-common";
import {createIdToken} from "./auth";
import {pg} from "../database/pg";


const MICROSOFT_AUTHORIZATION_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
const MICROSOFT_TOKEN_URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';

const SCOPE = 'openid profile email'
const REDIRECT_URL = `${BACKEND_URL}${OAUTH2_REDIRECT_PATH_MICROSOFT}`

export const oidcMicrosoftSetup = (api) => {


    // OpenID Connect Documentation
    // https://openid.net/specs/openid-connect-core-1_0.html

    console.log('BACKEND_URL', BACKEND_URL)
    console.log('process.env.NX_BACKEND_URL', process.env.NX_BACKEND_URL)
    console.log('redirect_url', REDIRECT_URL)

    // -------------------
    // REDIRECT TO GOOGLE
    // ------------------
    api.get(getBackendLoginMicrosoftUrl(), (req, res) => {
        console.log(MICROSOFT_AUTHORIZATION_URL);
        const url = `${MICROSOFT_AUTHORIZATION_URL}?${stringify({
            client_id: OAUTH2_CLIENT_ID_MICROSOFT,
            redirect_uri: REDIRECT_URL,
            access_type: 'offline',
            response_type: 'code',
            scope: SCOPE,
            state: 'random-state-string', // TODO: implement CSRF
            prompt: 'consent'
        })}`;
        res.redirect(url);
    });


    // -------------------
    // CALLBACK FOR GOOGLE
    // ------------------
    api.get(getBackendLoginRedirectMicrosoftUrl(), async (request, reply) => {
        console.log('called redirect_uri')
        console.log('request', request)
        const { code, scope } = request.query;
        //
        console.log('request.query', request.query)


        const tokenResponse = await axios.post(MICROSOFT_TOKEN_URL, stringify({
            code,
            client_id: OAUTH2_CLIENT_ID_MICROSOFT,
            client_secret: OAUTH2_CLIENT_SECRET_MICROSOFT,
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


        // // find user by email
        // const user: User = await pg('user')
        //     .where({ email }).first()

        // create user account if necessary
        const users = await pg<User>('user')
            .insert({
                email,
            })
            .onConflict('email')
            .merge()
            .returning('*')
        const user = users[0]


        const idToken = createIdToken({userUuid: user.userUuid})

        // return reply.send({status: "OK"})
        return reply.redirect(getFrontendOidcLoginCallbackUrl(true, idToken))

    });




}

