import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { API_CODE, PostResponseError } from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { convertListToIdAndObject } from '../utils'

export const getList = async (request, reply) => {
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

  const result = await pg('page')
    .where({ createdBy: userUuid })
    .orderBy('createdAt', 'ASC')
  return convertListToIdAndObject(result, 'pageUuid')
}
