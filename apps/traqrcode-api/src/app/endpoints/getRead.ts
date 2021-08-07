import {
  API_CODE,
  GetReadResponseError,
  GetReadResponseOk,
  PageItem,
  PostResponseError,
  to,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import { isValidUuid } from '../validators'

export const getRead = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  let [err, pageItem] = await to(
    pg('pageItem').where({ pageItemUuid: request.params.pageItemUuid }).first()
  )

  if (!pageItem) {
    const responseData: GetReadResponseError = {
      status: 'ERROR',
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  [err, pageItem] = await to(
    pg('pageItem').where({ pageItemUuid: request.params.pageItemUuid }).first()
  )

  const responseData: GetReadResponseOk = {
    pageItemProgressUuid: 'asdf',
    status: 'OK',
  }
  return reply.send(responseData)

  //   if (task.step === TaskStep.created) {
  //     log('notify receiver_ids')
  //     for (const workerId of r.workerIds) {
  //       log('send email')
  //       sendMail({
  //         sender: EMAIL_DEFAULT_SENDER,
  //         receiver: r.idToWorker[workerId],
  //         subject: email_notify_receiver_of_new_task_subject(),
  //         body: email_notify_receiver_of_new_task_body(
  //           item.title,
  //           item.subTitle,
  //           getFrontendActUrl(
  //             {
  //               action: Action.start,
  //               shortHash,
  //               itemId,
  //               taskId: task.id,
  //               workerId,
  //             },
  //             true
  //           ),
  //           getFrontendTaskUrl({ shortHash, itemId, taskId: task.id }, true)
  //         ),
  //       })
  //     }
  //   }
  //
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
