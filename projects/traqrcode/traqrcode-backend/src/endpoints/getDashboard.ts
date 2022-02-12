import {
  getAccessTokenFromRequest,
  verifyAccessToken,
} from '../middleware/auth'
import { pg } from '../database/pg'
import {
  ComputePercentiles,
  GetDashboardResponse,
  NumberByStatus,
  Page,
  PageItem,
  PageItemProgress,
  TimeCount,
} from '@hekori/traqrcode-common'
import { getNow, MyDate, timeDifference } from '@hekori/dates'

export type CombinedPageProgress = Page & PageItem & PageItemProgress

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

  let lastMonthNumberOfFinishedTasks = 0
  let lastMonthNumberOfInProgressTasks = 0
  let lastMonthNumberOfOpenTasks = 0

  const now = getNow()

  for (const row of result) {
    const status = getPageItemProgressStatus(row)
    switch (status) {
      case 'finished':
        numberOfFinishedTasks += 1
        if (timeDifference(row.finishedAt, now, 'months') >= 1)
          lastMonthNumberOfFinishedTasks += 1
        break
      case 'inProgress':
        numberOfInProgressTasks += 1
        if (timeDifference(row.startedAt, now, 'months') >= 1)
          lastMonthNumberOfInProgressTasks += 1
        break
      case 'open':
        numberOfOpenTasks += 1
        if (timeDifference(row.createdAt, now, 'months') >= 1)
          lastMonthNumberOfOpenTasks += 1
        break
      default:
        break
    }
  }
  return {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
    lastMonthNumberOfFinishedTasks,
    lastMonthNumberOfInProgressTasks,
    lastMonthNumberOfOpenTasks,
  }
}

export const sortByDuration = (
  a: { duration: number },
  b: { duration: number }
) => a.duration - b.duration

export const annotateDuration = (
  a: CombinedPageProgress
): CombinedPageProgress & { duration: number } => {
  const b: CombinedPageProgress & { duration: number } = {
    ...a,
    duration: Infinity,
  }
  if (b.finishedAt)
    b.duration = timeDifference(a.createdAt, a.finishedAt, 'seconds')
  return b
}

export const computePercentiles = (
  result: CombinedPageProgress[]
): ComputePercentiles => {
  const sorted = [...result.map(annotateDuration)].sort(sortByDuration)
  console.log('sorted=', sorted)

  const now = getNow()

  const percentile50Index = Math.ceil(sorted.length * 0.5) - 1
  const atLeast50PercentFinishedWithin = sorted[percentile50Index]?.duration

  console.log('percentile50Index', percentile50Index)

  const percentile90Index = Math.ceil(sorted.length * 0.9) - 1
  const atLeast90PercentFinishedWithin = sorted[percentile90Index]?.duration

  const percentile99Index = Math.ceil(sorted.length * 0.99) - 1
  const atLeast99PercentFinishedWithin = sorted[percentile99Index]?.duration

  const retval: ComputePercentiles = {
    atLeast50PercentFinishedWithin,
    atLeast90PercentFinishedWithin,
    atLeast99PercentFinishedWithin,
  }
  console.log('percentiles')
  console.log(result)
  console.log(retval)

  return retval
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
    .where({ 'page.createdBy': userUuid })
    .orderBy([{ column: 'pageItemProgress.createdAt', order: 'ASC' }])

  console.log('result=', result)
  const {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
    lastMonthNumberOfFinishedTasks,
    lastMonthNumberOfInProgressTasks,
    lastMonthNumberOfOpenTasks,
  } = getNumberByStatus(result)

  const openToInProgressTimingHistogram = getOpenToInProgressTimingHistogram(
    result
  )

  const percentiles = computePercentiles(result)

  const returnDto: GetDashboardResponse = {
    numberOfFinishedTasks,
    numberOfInProgressTasks,
    numberOfOpenTasks,
    lastMonthNumberOfFinishedTasks,
    lastMonthNumberOfInProgressTasks,
    lastMonthNumberOfOpenTasks,
    openToInProgressTimingHistogram,
    percentiles,
    status: 'OK',
  }

  return returnDto
}
