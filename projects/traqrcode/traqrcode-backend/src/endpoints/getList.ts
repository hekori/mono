import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../database/pg'
import { convertListToIdAndObject } from '../utils/utils'

export const getList = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  console.log('decoded', decoded)
  const { userUuid } = decoded

  const result = await pg('page')
    .where({ createdBy: userUuid })
    .orderBy('createdAt', 'ASC')
  return convertListToIdAndObject(result, 'pageUuid')
}
