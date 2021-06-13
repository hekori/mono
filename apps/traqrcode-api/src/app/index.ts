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
  getBackendCreatePostUrl,
  getBackendLoginPostUrl,
  PostCreateRequest,
  PostCreateResponse,
  PostLoginRequest,
  Req,
  shortuuid,
  STAGE,
} from '@hekori/traqrcode-common'
import fastify_cors from 'fastify-cors'
import { getDate, isoDatetimeFormatter } from '@hekori/dates'
import { createHash, getUnusedShortHash, writeReq } from './core'

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

// redirectApi.any('/*', async (res: MyHttpResponse, req: MyHttpRequest) => {
//   log('matched redirectApi')
//
//   log(' req.getUrl()', req.getUrl())
//   req.forEach((key: string, value: string) => {
//     console.log(`${key}: ${value}`)
//   })
//
//   redirectApi.redirectToHttps(res, req, SSL_PORT)
// })
//
// redirectApi.listen()

const api = fastify0({ logger: false })

// https://github.com/fastify/fastify-cors
api.register(fastify_cors, {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

api.post(getBackendCreatePostUrl(), async (request, reply) => {
  const data = request.body as PostCreateRequest
  const admin = 'sebastian.walter@gmail.com'

  const now = getDate()
  const s = shortuuid()
  const r: Req = {
    admin,
    createdAt: isoDatetimeFormatter(now),
    accessToken: createHash(),
    shortHash: getUnusedShortHash(),
    test: data.test,
    idToItem: {},
    idToWorker: { [s]: admin },
    workerIds: [s],
    itemIds: [],
  }
  await writeReq(r.shortHash, r)

  const responseData: PostCreateResponse = {
    status: API_CODE.OK,
  }

  return responseData
})

api.get(getBackendLoginPostUrl(), async (request, reply) => {
  console.log(`${request.method}: ${request.url} ${request.query}`)
  console.log(request.body)

  // const data = response as PostLoginRequest
  return {}
})

// Run the server!
const start = async () => {
  try {
    await api.listen(PORT)
  } catch (err) {
    api.log.error(err)
    process.exit(1)
  }
}
start()
