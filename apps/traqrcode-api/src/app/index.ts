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
  getBackendSignupPostUrl,
  InitialPageEditErrors,
  PostCreateRequest,
  PostCreateResponse,
  PostSignupRequest,
  PostSignupResponse,
  Req,
  shortuuid,
  STAGE,
  to,
} from '@hekori/traqrcode-common'
import fastify_cors from 'fastify-cors'
import { getDate, isoDatetimeFormatter, now } from '@hekori/dates'
import {
  createHash,
  getLoginUrlForEmail,
  getUnusedShortHash,
  readReq,
  writeReq,
} from './core'
import { pg } from '../pg'
import { UserInitializer } from './dbModels/types'
import { sendMail } from './mail'
import { emailLoginBody, emailLoginSubject } from './templates'

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

api.post('/signup', async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  // console.log(request.raw)
  console.log(request.id)

  let errors = {}

  const data = request.body as PostSignupRequest

  if (!data.email.includes('@')) {
    errors = { ...errors, email: API_CODE.ERROR_INVALID_EMAIL }
  }

  if (Object.keys(errors).length > 0) {
    reply.code(400).send({
      [API_CODE.status]: API_CODE.ERROR,
      [API_CODE.errors]: errors,
    })
  }

  const trx = await pg.transaction()

  try {
    const row = await trx('user').where({ email: data.email }).first()
    console.log('row', row)

    // create user if not exist
    if (!row) {
      const user: UserInitializer = {
        email: data.email,
      }
      await trx('user').insert(user)
    }

    // send out email
    const [emailSendError] = await to(
      sendMail({
        sender: EMAIL_DEFAULT_SENDER,
        subject: emailLoginSubject(),
        receiver: data.email,
        body: emailLoginBody({ loginUrl: getLoginUrlForEmail(data.email) }),
      })
    )

    if (emailSendError) {
      const responseBody: PostSignupResponse = {
        status: API_CODE.ERROR,
        errors: [API_CODE.ERROR_SENDING_EMAIL],
      }
      return reply.status(500).send(responseBody)
    }
    await trx.commit()

    const responseBody: PostSignupResponse = {
      status: API_CODE.OK,
      email: data.email,
      emailSentAt: now(),
    }
    return reply.send(responseBody)
  } catch (e) {
    await trx.rollback(e)
    console.error(e)
  }

  // const data = response as PostLoginRequest
  return {}
})

//
// api.post(getBackendCreatePostUrl(), async (request, reply) => {
//   console.log(`${request.method}: ${request.url} ${request.query}`)
//   console.log(request.body)
//
//   // TODO: CHECK JWT
//
//   const data = request.body as PostCreateRequest
//   const admin = 'sebastian.walter@gmail.com'
//
//   // const trx = await pg.transaction()
//
//   // try {
//   //   await trx(tableName).insert({
//   //     executedAt: dayjs().toISOString(),
//   //     name: migrationName,
//   //   })
//   //   await trx.commit()
//   // } catch (e) {
//   //   await trx.rollback(e)
//   //   console.error(e)
//   // }
//
//   const now = getDate()
//   const s = shortuuid()
//   const r: Req = {
//     admin,
//     createdAt: isoDatetimeFormatter(now),
//     accessToken: createHash(),
//     shortHash: getUnusedShortHash(),
//     test: data.test,
//     idToItem: {},
//     idToWorker: { [s]: admin },
//     workerIds: [s],
//     itemIds: [],
//   }
//   await writeReq(r.shortHash, r)
//
//   const responseData: PostCreateResponse = {
//     status: API_CODE.OK,
//   }
//
//   return responseData
// })

//
// api.get('/view/:shortHash/:accessToken', async (request, reply) => {
//   console.log(`${request.method}: ${request.url} ${request.query}`)
//   console.log(request.body)
//   console.log(request.query)
//   console.log(request.params)
//   console.log(request.headers)
//   console.log(request.raw)
//   console.log(request.id)
//
//   try {
//     const d: Req = readReq(shortHash)
//     return api.send(res, { status: API_CODE.OK, data: d })
//   } catch (e) {
//     return api.send(res, {
//       [API_CODE.status]: API_CODE.ERROR,
//       [API_CODE.errors]: {
//         ...InitialPageEditErrors,
//         count: 1,
//         global: [API_CODE.ERROR_NOT_FOUND],
//       },
//     })
//   }
// })

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
