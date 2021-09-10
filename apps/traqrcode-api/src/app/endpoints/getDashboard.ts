import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../../pg'
import { convertListToIdAndObject } from '../utils'
import { DetailsDatabaseResponse } from '../../../../../libs/traqrcode-common/src/lib/interfaces/details'
import { GetDashboardResponse } from '../../../../../libs/traqrcode-common/src/lib/interfaces/dashboard'
import { STATUS_CODES } from 'http'

export const getDashboard = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  const { userUuid } = decoded

  const result = await pg
    .from<{
      numberOfCreatedTasks: number
      numberOfStartedTasks: number
      numberOfFinishedTasks: number
    }>('page')
    .innerJoin('pageItem', 'page.pageUuid', 'pageItem.pageUuid')
    .innerJoin(
      'pageItemProgress',
      'pageItem.pageItemUuid',
      'pageItemProgress.pageItemUuid'
    )
    .where({ 'page.createdBy': userUuid })
    .count({
      numberOfCreatedTasks: 'pageItemProgress.createdAt',
      numberOfStartedTasks: 'pageItemProgress.startedAt',
      numberOfFinishedTasks: 'pageItemProgress.finishedAt',
    })

  const numberOfFinishedTasks = +result[0].numberOfFinishedTasks
  const numberOfInProgressTasks =
    result[0].numberOfStartedTasks - numberOfFinishedTasks
  const numberOfOpenTasks =
    result[0].numberOfCreatedTasks -
    numberOfInProgressTasks -
    numberOfFinishedTasks

  const returnDto: GetDashboardResponse = {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
    status: 'OK',
  }

  return returnDto
}
