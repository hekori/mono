import {
  API_CODE,
  PostResponseError,
  PostSignupRequest,
  PostSignupResponse,
  to,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { UserInitializer } from '../../../../../libs/traqrcode-common/src/lib/dbModels/types'
import {
  createAccessToken,
  getLoginUrlForAccessToken,
} from '../middleware/auth'
import { sendMail } from '../mail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import { emailLoginBody, emailLoginSubject } from '../templates'
import { getNow } from '@hekori/dates'

export const postSignup = async (request, reply) => {
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
}
