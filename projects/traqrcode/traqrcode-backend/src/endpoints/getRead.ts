import {
  Action,
  API_CODE,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
  GetReadResponseError,
  GetReadResponseOk,
  PageItemProgress,
  PageWorker,
  to,
  User,
} from '@hekori/traqrcode-common'
import { pg } from '../database/pg'
import { log } from '../utils/utils'
import { sendMail } from '../email/mail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import {
  email_notify_receiver_of_new_task_body,
  email_notify_receiver_of_new_task_subject,
} from '../email/emailTemplates'

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
    let rest: unknown[]
    ;[pageItemProgress, ...rest] = await pg('pageItemProgress')
      .insert({
        pageItemUuid: request.params.pageItemUuid,
      })
      .returning('*')
  }

  // send out emails
  const pageWorkers: (PageWorker & User)[] = await pg('pageWorker')
    .innerJoin('user', 'pageWorker.userUuid', 'user.userUuid')
    .where({
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
        getFrontendActUrl(
          {
            action: Action.start,
            pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
            userUuid: pageWorker.userUuid,
          },
          true
        ),
        getFrontendPageItemProgressUrl(
          { pageItemProgressUuid: pageItemProgress.pageItemProgressUuid },
          true
        )
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
