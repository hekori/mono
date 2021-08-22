import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../../pg'
import { convertListToIdAndObject } from '../utils'
import { DetailsDatabaseResponse } from '../../../../../libs/traqrcode-common/src/lib/interfaces/details'

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
      'pageItemProgress.pageWorkerUuid as pageWorkerUuid',
      'pageWorker.email as pageWorkerEmail'
    )
    .from<DetailsDatabaseResponse>('page')
    .innerJoin('pageItem', 'page.pageUuid', 'pageItem.pageUuid')
    .innerJoin(
      'pageItemProgress',
      'pageItem.pageItemUuid',
      'pageItemProgress.pageItemUuid'
    )
    .leftJoin(
      'pageWorker',
      'pageItemProgress.pageWorkerUuid',
      'pageWorker.pageWorkerUuid'
    )
    .where({ 'page.createdBy': userUuid })
    .orderBy([{ column: 'pageItemProgress.createdAt', order: 'ASC' }])

  return convertListToIdAndObject(result, 'pageItemProgressUuid')
}
