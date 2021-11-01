// Require the framework and instantiate it
import fastify0 from 'fastify'
import {
  EMAIL_DEFAULT_SENDER,
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
  STAGE,
} from '@hekori/traqrcode-common'
import fastify_cors from 'fastify-cors'
import { postSignup } from './endpoints/postSignup'
import { getEdit } from './endpoints/getEdit'
import { postCreate } from './endpoints/postCreate'
import { getList } from './endpoints/getList'
import { deletePage } from './endpoints/deletePage'
import { postEdit } from './endpoints/postEdit'
import { getPdf } from './endpoints/getPdf'
import { getRead } from './endpoints/getRead'
import { AuthenticationError } from './errors'
import { getTask } from './endpoints/getTask'
import { getAct } from './endpoints/getAct'
import { getDetails } from './endpoints/getDetails'
import { getDashboard } from './endpoints/getDashboard'
import { getVersion } from './endpoints/getVersion'

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
  console.error(error)

  if (error instanceof AuthenticationError) {
    return reply
      .status(401)
      .send({ status: API_CODE.ERROR_INVALID_ACCESS_TOKEN })
  }

  return reply.status(500).send({ status: API_CODE.ERROR, error })
})

api.get('/api/version2', getVersion)
api.get('/version', getVersion)
api.get('/dashboard', getDashboard)
api.get('/list', getList)
api.get('/details', getDetails)
api.get('/edit/:pageUuid', getEdit)
api.get('/pdf/:pageUuid', getPdf)
api.get('/read/:pageItemUuid', getRead)
api.get('/task/:pageItemProgressUuid', getTask)
api.get('/act/:action/:pageItemProgressUuid/:userUuid', getAct)
api.post('/signup', postSignup)
api.post('/edit/:pageUuid', postEdit)
api.post('/create', postCreate)
api.delete<{
  Params: {
    pageUuid: string
  }
  Headers: {
    Authorization: string
  }
}>('/page/:pageUuid', deletePage)

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
