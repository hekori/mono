import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { API_CODE, PostResponseError } from '@hekori/traqrcode-common'
import { pg } from '../database/pg'

export const deletePage = async (request, reply) => {
  const pageUuid = request.params.pageUuid

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

  await pg('page').where({ createdBy: userUuid, pageUuid }).delete()

  return reply.status(200).send({ status: API_CODE.OK, pageUuid })
}
