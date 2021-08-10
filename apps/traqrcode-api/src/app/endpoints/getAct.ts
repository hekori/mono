import { pg } from '../../pg'
import { GetActResponseOk } from '../../../../../libs/traqrcode-common/src/lib/interfaces/act'
import { getNow } from '@hekori/dates'
import { sendMail } from '../mail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import {
  email_notify_accept_task_body,
  email_notify_accept_task_subject,
  email_notify_done_task_body,
  email_notify_done_task_subject,
} from '../templates'
import {
  Action,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
  PageItem,
  PageItemProgress,
  PageWorker,
} from '@hekori/traqrcode-common'

export const getAct = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const pageItemProgressUuid = request.params.pageItemProgressUuid
  const pageWorkerUuid = request.params.pageWorkerUuid
  const action = request.params.action

  const pageWorker: PageWorker = await pg('pageWorker')
    .where({ pageWorkerUuid })
    .first()
  const pageItemProgress: PageItemProgress = await pg('pageItemProgress')
    .where({ pageItemProgressUuid })
    .first()
  const pageItem: PageItem = await pg('pageItem')
    .where({
      pageItemUuid: pageItemProgress.pageItemUuid,
    })
    .first()

  if (action === 'start') {
    await pg('pageItemProgress').where({ pageItemProgressUuid }).update({
      pageWorkerUuid: pageWorker.pageWorkerUuid,
      startedAt: getNow(),
    })

    await sendMail({
      sender: EMAIL_DEFAULT_SENDER,
      receiver: pageWorker.email,
      subject: email_notify_accept_task_subject(),
      body: email_notify_accept_task_body(
        pageItem.title,
        pageItem.subTitle,
        getFrontendActUrl(
          {
            action: Action.stop,
            pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
            pageWorkerUuid: pageWorker.pageWorkerUuid,
          },
          true
        ),
        getFrontendPageItemProgressUrl(
          { pageItemProgressUuid: pageItemProgress.pageItemProgressUuid },
          true
        )
      ),
    })
  } else if (action === 'stop') {
    await pg('pageItemProgress').where({ pageItemProgressUuid }).update({
      pageWorkerUuid: pageWorkerUuid,
      finishedAt: getNow(),
    })

    await sendMail({
      sender: EMAIL_DEFAULT_SENDER,
      receiver: pageWorker.email,
      subject: email_notify_done_task_subject(),
      body: email_notify_done_task_body(
        pageItem.title,
        pageItem.subTitle,
        getFrontendPageItemProgressUrl(
          { pageItemProgressUuid: pageItemProgress.pageItemProgressUuid },
          true
        )
      ),
    })
  }

  const responseData: GetActResponseOk = {
    status: 'OK',
  }
  return reply.send(responseData)
}
