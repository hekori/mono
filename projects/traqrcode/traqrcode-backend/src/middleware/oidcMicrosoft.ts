import {
    BACKEND_URL,
    OAUTH2_AUTHORIZATION_URL_MICROSOFT,
    OAUTH2_TOKEN_URL_MICROSOFT,
    OAUTH2_CLIENT_ID_MICROSOFT,
    OAUTH2_CLIENT_SECRET_MICROSOFT,
    OAUTH2_REDIRECT_PATH_MICROSOFT,
} from "../settings";
import {stringify} from "querystring";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    getBackendLoginMicrosoftUrl,
    getBackendLoginRedirectMicrosoftUrl, getFrontendOidcLoginCallbackErrorUrl,
    getFrontendOidcLoginCallbackUrl, OidcCsrfStateInitializer,
    User
} from "@hekori/traqrcode-common";
import {createIdToken} from "./auth";
import {pg} from "../database/pg";
import {v4 as uuidv4} from "uuid";


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
    api.get(getBackendLoginMicrosoftUrl(), async (request, reply) => {
        console.log(OAUTH2_AUTHORIZATION_URL_MICROSOFT);

        const csrfToken = uuidv4()
        await pg<OidcCsrfStateInitializer>('oidcCsrfState').insert({
            csrfToken,
        })

        const url = `${OAUTH2_AUTHORIZATION_URL_MICROSOFT}?${stringify({
            client_id: OAUTH2_CLIENT_ID_MICROSOFT,
            redirect_uri: REDIRECT_URL,
            access_type: 'offline',
            response_type: 'code',
            scope: SCOPE,
            state: csrfToken,
            prompt: 'consent'
        })}`;
        reply.redirect(url);
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

        const csrfToken = request?.query?.state  ?? 'undefined'
        const row = await pg<OidcCsrfStateInitializer>('oidcCsrfState').where({ csrfToken }).first()
        console.log('row=', row)
        if(!row) return reply.redirect(getFrontendOidcLoginCallbackErrorUrl(true))


        const tokenResponse = await axios.post(OAUTH2_TOKEN_URL_MICROSOFT, stringify({
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

