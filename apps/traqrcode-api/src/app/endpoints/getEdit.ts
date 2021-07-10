import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { API_CODE, PostResponseError } from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { createRandomName } from '../randomNames'

export const getEdit = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  if (!decoded) {
    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [API_CODE.ERROR_INVALID_ACCESS_TOKEN],
    }
    return reply.status(422).send(responseData)
  }

  const { userUuid } = decoded

  const page = await pg('page')
    .where({ createdBy: userUuid, pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')
    .first()

  const pageItems = await pg('pageItem')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')

  const pageWorker = await pg('pageWorker')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')

  page.title = createRandomName()

  console.log(page)
  console.log(pageItems)
  console.log(pageWorker)

  reply.send({ page, pageItems, pageWorker })
}
