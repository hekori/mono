import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import {
  API_CODE,
  PostCreateRequest,
  PostCreateResponse,
  PostResponseError,
  ResponseBase,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { createRandomName } from '../randomNames'

export const postCreate = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  if (!decoded) {
    const responseData: ResponseBase = {
      status: API_CODE.ERROR_INVALID_ACCESS_TOKEN,
    }
    return reply.status(422).send(responseData)
  }

  console.log('decoded', decoded)

  const data = request.body as PostCreateRequest
  const createdBy = decoded.userUuid

  const trx = await pg.transaction()

  try {
    const [pageUuid] = await trx('page')
      .insert({
        title: createRandomName(),
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

    return reply.status(400).send(responseData)
  }
}
