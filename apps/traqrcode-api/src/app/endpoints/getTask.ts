import {
  API_CODE,
  GetReadResponseError,
  PageItem,
  PageItemProgress,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { GetTaskResponseOk } from '../../../../../libs/traqrcode-common/src/lib/interfaces/task'

export const getTask = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const pageItemProgress: PageItemProgress = await pg('pageItemProgress')
    .where({ pageItemProgressUuid: request.params.pageItemProgressUuid })
    .first()

  if (!pageItemProgress) {
    const responseData: GetReadResponseError = {
      status: 'ERROR',
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  const pageItem: PageItem = await pg('pageItem')
    .where({ pageItemUuid: pageItemProgress.pageItemUuid })
    .first()

  const responseData: GetTaskResponseOk = {
    createdAt: pageItemProgress.createdAt,
    finishedAt: pageItemProgress.finishedAt,
    subTitle: pageItem.subTitle,
    title: pageItem.title,
    startedAt: pageItemProgress.startedAt,
    status: 'OK',
  }
  return reply.send(responseData)
}
