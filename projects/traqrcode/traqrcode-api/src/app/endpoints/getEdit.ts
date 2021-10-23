import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import {
  API_CODE,
  GetEditResponse,
  Page,
  PageItem,
  PageWorker,
  PostResponseError,
  User,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { createRandomName } from '../randomNames'
import { convertListToIdAndObject } from '../utils'

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

  const page: Page = await pg('page')
    .where({ createdBy: userUuid, pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')
    .first()

  if (!page) {
    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  const pageItems: PageItem[] = await pg('pageItem')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')

  const pageWorkers: (PageWorker & User)[] = await pg('pageWorker')
    .innerJoin('user', 'pageWorker.userUuid', 'user.userUuid')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('pageWorker.createdAt', 'ASC')

  console.log('page', page)
  console.log('pageItems', pageItems)
  console.log('pageWorker', pageWorkers)

  const pageItemData = convertListToIdAndObject<PageItem>(
    pageItems,
    'pageItemUuid'
  )
  const pageWorkerData = convertListToIdAndObject<PageWorker & User>(
    pageWorkers,
    'userUuid'
  )

  const returnValue: GetEditResponse = {
    pageUuid: page.pageUuid,
    title: page.title,
    pageItemUuids: pageItemData.ids,
    uuidToPageItem: pageItemData.idToItem,
    emails: pageWorkerData.ids.map((id) => pageWorkerData.idToItem[id].email),
  }

  reply.send(returnValue)
}
