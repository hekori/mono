import {pg} from '../database/pg'

import { Authenticator } from '@fastify/passport'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import {fastifySecureSession} from '@fastify/secure-session'


import {
    BACKEND_URL,
    FASTIFY_SESSION_SECRET_KEY,
    OAUTH2_CLIENT_ID_GOOGLE,
    OAUTH2_CLIENT_SECRET_GOOGLE,
    OAUTH2_LOGIN_URL_GOOGLE,
    OAUTH2_REDIRECT_URL_GOOGLE
} from "../settings";
import {FederatedCredentialsInitializer, to, UserInitializer} from "@hekori/traqrcode-common";


const GoogleStrategy = require('passport-google-oauth20').Strategy;

const verifyDummy = async (accessToken, refreshToken, profile, cb) => { return cb(null, false)}


const verify = async (accessToken, refreshToken, profile, cb) => {
    console.log('called verify')
    console.log('accessToken\n', accessToken)
    console.log('refreshToken\n', refreshToken)
    console.log('profile\n', profile)

    const provider = 'https://accounts.google.com'

    // check that the email is in the profile (we require the email!)
    const email = profile.emails[0]
    if (!email) {
        const errString = 'no email in the users profile'
        console.log(errString)
        return cb(new Error(errString))
    }

    // check if federated credentials exist
    const [err, cred] = await to(pg('federatedCredentials')
        .where({provider, subject: profile.id})
        .first())

    console.log('cred', cred)
    if (err) return cb(err)

    // case: credentials exist (implies that user also exists)
    if (cred) {
        const [err, user] = await to(pg('user').where({userUuid: cred.userUuid}).first())
        if (err) return cb(err)
        if(!user) return cb(null, false)
        return cb(null, user);
    }
    // case: credentials do not exist,
    else {

        // TODO: add error handling for the case where the insert fails
        const userInit: UserInitializer = {email}
        const newUser = await pg('user').insert(userInit).returning('*')[0]

        const newCreds: FederatedCredentialsInitializer = {
            provider: provider,
            subject: profile.id,
            userUuid: newUser.userUuid
        }

        const [err2] = await to(pg('federatedCredentials').insert(newCreds).returning('*'))
        if (err2){
            return cb(err2)
        }
        return cb(null, newUser)
    }
}


export const oidcSetup = (api) => {
    const fastifyPassport = new Authenticator()

    // api.register(fastifyCookie)
    // api.register(fastifySession, {
    //     secret: FASTIFY_SESSION_SECRET_KEY,
    // });

    api.register(fastifySecureSession, {
        secret: FASTIFY_SESSION_SECRET_KEY,
    });

    api.register(fastifyPassport.initialize())
    api.register(fastifyPassport.secureSession())

    // Passport configuration
    fastifyPassport.use('google', new GoogleStrategy({
        clientID: OAUTH2_CLIENT_ID_GOOGLE,
        clientSecret: OAUTH2_CLIENT_SECRET_GOOGLE,
        callbackURL: `${BACKEND_URL}${OAUTH2_REDIRECT_URL_GOOGLE}`,
        scope: ['profile'],
        state: true
    }, verifyDummy));

    // fastifyPassport.serializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //         cb(null, { id: user.userUuid, email: user.email });
    //     });
    // });
    //
    // fastifyPassport.deserializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //         return cb(null, user);
    //     });
    // });



    api.get(OAUTH2_LOGIN_URL_GOOGLE, fastifyPassport.authenticate('google'));
    api.get(OAUTH2_REDIRECT_URL_GOOGLE,
        fastifyPassport.authenticate('google', { failureRedirect: '/', failureMessage: true }))
}

