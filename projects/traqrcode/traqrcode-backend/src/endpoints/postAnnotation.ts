import {
  Action,
  API_CODE,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
  GetReadResponseError,
  GetReadResponseOk,
  PageWorker,
  PostAnnotationRequest, PostAnnotationResponseOk,
  to,
  User,
} from '@hekori/traqrcode-common'
import { pg } from '../database/pg'
import { log } from '../utils/utils'
import { sendMail } from '../email/sendMail'
import { EMAIL_DEFAULT_SENDER } from '../settings'
import {
  email_notify_receiver_of_new_task_body,
  email_notify_receiver_of_new_task_subject,
} from '../email/emailTemplates'

export const postAnnotation = async (request, reply) => {
  console.log(request.body)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const data = request.body as PostAnnotationRequest

  console.log('called postAnnotation')
  console.log('data', data)

  const [err, pageItem] = await to(
    pg('pageItem').where({ pageItemUuid: data.pageItemUuid }).first()
  )

  if (!pageItem) {
    const responseData: GetReadResponseError = {
      status: 'ERROR',
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  // let pageItemProgress: PageItemProgress = await pg('pageItemProgress')
  //     .where({
  //         pageItemUuid: data.pageItemUuid,
  //         startedAt: null,
  //         finishedAt: null,
  //     })
  //     .first()

  const [pageItemProgress, ...rest] = await pg('pageItemProgress')
    .insert({
      pageItemUuid: data.pageItemUuid,
      annotation: data.annotation,
    })
    .returning('*')

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
        pageItemProgress.annotation,
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

  const responseData: PostAnnotationResponseOk = {
    pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
    status: 'OK',
  }
  return reply.send(responseData)
}
