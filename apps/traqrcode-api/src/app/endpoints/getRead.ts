import {
  API_CODE,
  GetReadResponseError,
  GetReadResponseOk,
  PageItemProgress,
  PageWorker,
  to,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { log } from '../utils'
import { sendMail } from '../mail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import {
  email_notify_receiver_of_new_task_body,
  email_notify_receiver_of_new_task_subject,
} from '../templates'

export const getRead = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const [err, pageItem] = await to(
    pg('pageItem').where({ pageItemUuid: request.params.pageItemUuid }).first()
  )

  if (!pageItem) {
    const responseData: GetReadResponseError = {
      status: 'ERROR',
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  let pageItemProgress: PageItemProgress = await pg('pageItemProgress')
    .where({
      pageItemUuid: request.params.pageItemUuid,
      startedAt: null,
      finishedAt: null,
    })
    .first()

  if (!pageItemProgress) {
    pageItemProgress = await pg('pageItemProgress')
      .insert({
        pageItemUuid: request.params.pageItemUuid,
      })
      .returning('*')
      .first()
  }

  // send out emails
  const pageWorkers: PageWorker[] = await pg('pageWorker').where({
    pageUuid: pageItem.pageUuid,
  })

  log('notify receiver_ids')
  for (const pageWorker of pageWorkers) {
    log('send email')
    await sendMail({
      sender: EMAIL_DEFAULT_SENDER,
      receiver: pageWorker.email,
      subject: email_notify_receiver_of_new_task_subject(),
      body: email_notify_receiver_of_new_task_body(
        pageItem.title,
        pageItem.subTitle,
        'todo',
        'todo'
        // getFrontendActUrl(
        //     {
        //       action: Action.start,
        //       shortHash,
        //       itemId,
        //       taskId: task.id,
        //       workerId,
        //     },
        //     true
        // ),
        // getFrontendTaskUrl({ shortHash, itemId, taskId: task.id }, true)
      ),
    })
  }

  const responseData: GetReadResponseOk = {
    pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
    status: 'OK',
  }
  return reply.send(responseData)

  //   task.notifiedAt = isoDatetimeFormatter(getDate())
  //   task.step = TaskStep.notified
  //
  //   writeReq(shortHash, r)
  //
  //   api.send(res, {
  //     [API_CODE.status]: API_CODE.OK,
  //     task: {
  //       step: task.step,
  //       id: task.id,
  //       createdAt: task.createdAt,
  //       notifiedAt: task.notifiedAt,
  //       startedAt: task.startedAt,
  //       doneAt: task.doneAt,
  //     },
  //   })
}
