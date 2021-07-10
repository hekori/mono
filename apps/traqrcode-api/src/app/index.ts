// Require the framework and instantiate it
import fastify0 from 'fastify'
import {
  EMAIL_DEFAULT_SENDER,
  JWT_PRIVATE_KEY,
  PGDATABASE,
  PGHOST,
  PGPORT,
  PGUSER,
  PORT,
  PROJECT_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SSL_PORT,
  SSL_PRIVATE_KEY_PATH,
  SSL_PUBLIC_CERT_PATH,
  STATIC_DIR,
  STORE_DIR,
} from './settings'
import {
  API_CODE,
  BACKEND_URL,
  FRONTEND_URL,
  getBackendCreatePagePostUrl,
  getBackendEditPageGetUrl,
  getBackendListGetUrl,
  getBackendPageDeleteUrl,
  getBackendSignupPostUrl,
  InitialPageEditErrors,
  PostCreateRequest,
  PostCreateResponse,
  PostResponseError,
  PostSignupRequest,
  PostSignupResponse,
  Req,
  shortuuid,
  STAGE,
  to,
} from '@hekori/traqrcode-common'
import fastify_cors from 'fastify-cors'
import { getDate, isoDatetimeFormatter, getNow } from '@hekori/dates'
import { createHash, getUnusedShortHash, readReq, writeReq } from './core'
import { pg } from '../pg'
import { UserInitializer } from '../../../../libs/traqrcode-common/src/lib/dbModels/types'
import { sendMail } from './mail'
import { emailLoginBody, emailLoginSubject } from './templates'
import { convertListToIdAndObject } from './utils'
import {
  createAccessToken,
  getAccessTokenFromRequest,
  getLoginUrlForAccessToken,
  verifyAccessToken,
} from './middleware/auth'
import { postSignup } from './endpoints/postSignup'
import { getEdit } from './endpoints/getEdit'
import { postCreate } from './endpoints/postCreate'
import { getList } from './endpoints/getList'
import { deletePage } from './endpoints/deletePage'

console.log('-'.repeat(80))
console.log('STAGE=', STAGE)
console.log('PROJECT_DIR=', PROJECT_DIR)
console.log('STORE_DIR=', STORE_DIR)
console.log('STATIC_DIR=', STATIC_DIR)
console.log('FRONTEND_URL=', FRONTEND_URL)
console.log('BACKEND_URL=', BACKEND_URL)
console.log('SMTP_HOST=', SMTP_HOST)
console.log('SMTP_PORT=', SMTP_PORT)
console.log('SMTP_USER=', SMTP_USER)
console.log('EMAIL_DEFAULT_SENDER=', EMAIL_DEFAULT_SENDER)
console.log('SSL_PRIVATE_KEY_PATH=', SSL_PRIVATE_KEY_PATH)
console.log('SSL_PUBLIC_CERT_PATH=', SSL_PUBLIC_CERT_PATH)
console.log('SSL_PORT=', SSL_PORT)
console.log('PORT=', PORT)
console.log('PGUSER=', PGUSER)
console.log('PGHOST=', PGHOST)
console.log('PGDATABASE=', PGDATABASE)
console.log('PGPORT=', PGPORT)
console.log('JWT_PRIVATE_KEY=', process.env.JWT_PRIVATE_KEY)

console.log('-'.repeat(80))

const api = fastify0({ logger: true })

// https://github.com/fastify/fastify-cors
api.register(fastify_cors, {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

api.ready(() => {
  console.log('Server is ready and accepts')
  console.log(api.printRoutes())
})

api.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error })
})

api.post('/signup', postSignup)
api.get('/edit/:pageUuid', getEdit)
api.post(getBackendCreatePagePostUrl(), postCreate)
api.get(getBackendListGetUrl(), getList)
api.delete<{
  Params: {
    pageUuid: string
  }
  Headers: {
    Authorization: string
  }
}>(getBackendPageDeleteUrl({}), {}, deletePage)

// Run the server!
const start = async () => {
  try {
    console.info('starting server')
    await api.listen(PORT)
  } catch (err) {
    api.log.error(err)
    process.exit(1)
  }
}
void start()
