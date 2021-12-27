import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../database/pg'
import { convertListToIdAndObject } from '../utils/utils'
import { DetailsDatabaseResponse } from '@hekori/traqrcode-common'

export const getDetails = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  const { userUuid } = decoded

  const result = await pg
    .select(
      'page.pageUuid as pageUuid',
      'page.title as pageTitle',
      'pageItem.pageItemUuid as pageItemUuid',
      'pageItem.title as pageItemTitle',
      'pageItem.subTitle as pageItemSubTitle',
      'pageItemProgress.pageItemProgressUuid as pageItemProgressUuid',
      'pageItemProgress.createdAt as pageItemProgressCreatedAt',
      'pageItemProgress.startedAt as pageItemProgressStartedAt',
      'pageItemProgress.finishedAt as pageItemProgressFinishedAt',
      'user.email as userEmail'
    )
    .from<DetailsDatabaseResponse>('page')
    .innerJoin('pageItem', 'page.pageUuid', 'pageItem.pageUuid')
    .innerJoin(
      'pageItemProgress',
      'pageItem.pageItemUuid',
      'pageItemProgress.pageItemUuid'
    )
    .leftJoin('user', 'pageItemProgress.userUuid', 'user.userUuid')
    .where({ 'page.createdBy': userUuid })
    .orderBy([{ column: 'pageItemProgress.createdAt', order: 'DESC' }])

  return convertListToIdAndObject(result, 'pageItemProgressUuid')
}
