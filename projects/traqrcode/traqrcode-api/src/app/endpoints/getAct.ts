import { pg } from '../../pg'
import {
  Action,
  GetActResponseOk,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
  PageItem,
  PageItemProgress,
  User,
} from '@hekori/traqrcode-common'
import { getNow } from '@hekori/dates'
import { sendMail } from '../mail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import {
  email_notify_accept_task_body,
  email_notify_accept_task_subject,
  email_notify_done_task_body,
  email_notify_done_task_subject,
} from '../templates'

export const getAct = async (request, reply) => {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const pageItemProgressUuid = request.params.pageItemProgressUuid
  const userUuid = request.params.userUuid
  const action = request.params.action

  const user: User = await pg('user').where({ userUuid }).first()
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
      userUuid: user.userUuid,
      startedAt: getNow(),
    })

    await sendMail({
      sender: EMAIL_DEFAULT_SENDER,
      receiver: user.email,
      subject: email_notify_accept_task_subject(),
      body: email_notify_accept_task_body(
        pageItem.title,
        pageItem.subTitle,
        getFrontendActUrl(
          {
            action: Action.stop,
            pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
            userUuid: user.userUuid,
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
      userUuid: user.userUuid,
      finishedAt: getNow(),
    })

    await sendMail({
      sender: EMAIL_DEFAULT_SENDER,
      receiver: user.email,
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
