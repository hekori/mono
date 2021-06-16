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
  getBackendCreatePostUrl,
  getBackendListGetUrl,
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
import {
  createAccessToken,
  createHash,
  getAccessTokenFromRequest,
  getLoginUrlForAccessToken,
  getUnusedShortHash,
  readReq,
  verifyAccessToken,
  writeReq,
} from './core'
import { pg } from '../pg'
import { UserInitializer } from '../../../../libs/traqrcode-common/src/lib/dbModels/types'
import { sendMail } from './mail'
import { emailLoginBody, emailLoginSubject } from './templates'
import { convertListToIdAndObject } from './utils'

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
    const user = await trx('user').where({ email: data.email }).first()
    let userUuid = user?.userUuid
    console.log('userUuid', userUuid)

    // create user if not exist
    if (!userUuid) {
      const userInit: UserInitializer = {
        email: data.email,
      }
      ;[{ userUuid }] = await trx('user').insert(userInit).returning('*')
    }
    console.log('userUuid', userUuid)

    const accessToken = createAccessToken({ userUuid })

    // send out email
    const [emailSendError] = await to(
      sendMail({
        sender: EMAIL_DEFAULT_SENDER,
        subject: emailLoginSubject(),
        receiver: data.email,
        body: emailLoginBody({
          loginUrl: getLoginUrlForAccessToken(accessToken),
        }),
      })
    )

    if (emailSendError) {
      const responseBody: PostResponseError = {
        status: API_CODE.ERROR,
        errors: [API_CODE.ERROR_SENDING_EMAIL],
      }
      return reply.status(500).send(responseBody)
    }
    await trx.commit()

    const responseBody: PostSignupResponse = {
      status: API_CODE.OK,
      email: data.email,
      emailSentAt: getNow(),
    }
    return reply.send(responseBody)
  } catch (e) {
    await trx.rollback(e)
    console.error(e)
  }

  // const data = response as PostLoginRequest
  return {}
})

api.post(getBackendCreatePostUrl(), async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  if (!decoded) {
    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [API_CODE.ERROR_INVALID_ACCESS_TOKEN],
    }
    return reply.send(responseData)
  }

  const data = request.body as PostCreateRequest
  const createdBy = decoded.userUuid

  const trx = await pg.transaction()

  try {
    const [pageUuid] = await trx('page')
      .insert({
        createdBy,
      })
      .returning('pageUuid')
    await trx.commit()

    const responseData: PostCreateResponse = {
      status: API_CODE.OK,
      pageUuid,
    }

    return responseData
  } catch (e) {
    await trx.rollback(e)
    console.error(e)

    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [e.toString()],
    }

    return responseData
  }
})

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

api.get(getBackendListGetUrl(), async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  if (!decoded) {
    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [API_CODE.ERROR_INVALID_ACCESS_TOKEN],
    }
    return reply.send(responseData)
  }

  const { userUuid } = decoded

  const result = await pg('page').where({ createdBy: userUuid })
  await sleep(1000)
  return convertListToIdAndObject(result, 'pageUuid')
})

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
