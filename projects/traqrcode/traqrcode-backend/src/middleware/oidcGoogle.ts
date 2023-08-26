import {
    BACKEND_URL,
    OAUTH2_CLIENT_ID_GOOGLE,
    OAUTH2_CLIENT_SECRET_GOOGLE,
    OAUTH2_LOGIN_URL_GOOGLE,
    OAUTH2_REDIRECT_URL_GOOGLE
} from "../settings";
import {stringify} from "querystring";
import axios from "axios";
import jwt_decode from 'jwt-decode';


const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://accounts.google.com/token'

const SCOPE = 'openid email'
const REDIRECT_URL = `${BACKEND_URL}${OAUTH2_REDIRECT_URL_GOOGLE}`

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
    api.get(OAUTH2_LOGIN_URL_GOOGLE, (req, res) => {
        console.log(GOOGLE_AUTHORIZATION_URL);
        const url = `${GOOGLE_AUTHORIZATION_URL}?${stringify({
            client_id: OAUTH2_CLIENT_ID_GOOGLE,
            redirect_uri: REDIRECT_URL,
            access_type: 'offline',
            response_type: 'code',
            scope: 'openid email',
            state: 'random-state-string'
        })}`;
        res.redirect(url);
    });


    // -------------------
    // CALLBACK FOR GOOGLE
    // ------------------
    api.get(OAUTH2_REDIRECT_URL_GOOGLE, async (request, reply) => {
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
        const { access_token, refresh_token, id_token } = tokenResponse.data;


        console.log('jwt_decode', jwt_decode(id_token))

        return reply.send({status: "OK"})


    });




}

