import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../../pg'
import {
  GetDashboardResponse,
  NumberByStatus,
  TimeCount,
} from '../../../../../libs/traqrcode-common/src/lib/interfaces/dashboard'
import { Page, PageItem, PageItemProgress } from '@hekori/traqrcode-common'

type CombinedPageProgress = Page & PageItem & PageItemProgress

type GetPageItemProgressStatusDto = 'finished' | 'inProgress' | 'open'
export const getPageItemProgressStatus = (
  pageItemProgress: PageItemProgress
): GetPageItemProgressStatusDto => {
  if (pageItemProgress.finishedAt) return 'finished'
  else if (pageItemProgress.startedAt) return 'inProgress'
  else if (pageItemProgress.createdAt) return 'open'
  else throw new Error('Invalid status. createdAt must not be null')
}

export const getNumberByStatus = (
  result: CombinedPageProgress[]
): NumberByStatus => {
  let numberOfFinishedTasks = 0
  let numberOfInProgressTasks = 0
  let numberOfOpenTasks = 0

  for (const row of result) {
    const status = getPageItemProgressStatus(row)
    switch (status) {
      case 'finished':
        numberOfFinishedTasks += 1
        break
      case 'inProgress':
        numberOfInProgressTasks += 1
        break
      case 'open':
        numberOfOpenTasks += 1
        break
      default:
        break
    }
  }
  return { numberOfFinishedTasks, numberOfInProgressTasks, numberOfOpenTasks }
}

export const getOpenToInProgressTimingHistogram = (
  result: CombinedPageProgress[]
): TimeCount[] => {
  const retval: TimeCount[] = []
  for (let i = 0; i < 100; i++) {
    retval.push({ time: i, count: i + 1 })
  }
  return retval
}

export const getDashboard = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const accessToken = getAccessTokenFromRequest(request)
  const decoded = verifyAccessToken(accessToken)

  const { userUuid } = decoded

  const result = await pg
    .from<CombinedPageProgress>('page')
    .innerJoin('pageItem', 'page.pageUuid', 'pageItem.pageUuid')
    .innerJoin(
      'pageItemProgress',
      'pageItem.pageItemUuid',
      'pageItemProgress.pageItemUuid'
    )
    .orderBy([{ column: 'pageItemProgress.createdAt', order: 'ASC' }])

  console.log('result=', result)
  const {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
  } = getNumberByStatus(result)

  const openToInProgressTimingHistogram = getOpenToInProgressTimingHistogram(
    result
  )

  const returnDto: GetDashboardResponse = {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
    openToInProgressTimingHistogram,
    status: 'OK',
  }

  return returnDto
}
