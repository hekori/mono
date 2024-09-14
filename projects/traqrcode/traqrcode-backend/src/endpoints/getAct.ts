import {pg} from '../database/pg'
import {
    Action,
    GetActResponseOk,
    getFrontendActUrl,
    getFrontendPageItemProgressUrl, Page,
    PageItem,
    PageItemProgress,
    User,
} from '@hekori/traqrcode-common'
import {getNow} from '@hekori/dates'
import {sendMail} from '../email/sendMail'
import {EMAIL_DEFAULT_SENDER} from '../settings'
import {
    email_notify_accept_task_body,
    email_notify_accept_task_subject,
    email_notify_done_task_body,
    email_notify_done_task_subject,
} from '../email/emailTemplates'

export const getAct = async (request, reply) => {
    console.log(request.body)
    console.log(request.query)
    console.log(request.params)
    console.log(request.headers)
    console.log(request.headers?.authorization)

    const pageItemProgressUuid = request.params.pageItemProgressUuid
    const userUuid = request.params.userUuid
    const action = request.params.action

    const user: User = await pg('user').where({userUuid}).first()
    const pageItemProgress: PageItemProgress = await pg('pageItemProgress')
        .where({pageItemProgressUuid})
        .first()
    const pageItem: PageItem = await pg('pageItem')
        .where({
            pageItemUuid: pageItemProgress.pageItemUuid,
        })
        .first()

    const page: Page = await pg('page')
        .where({
            pageUuid: pageItem.pageUuid,
        })
        .first()

    if (action === 'start') {
        await pg('pageItemProgress').where({pageItemProgressUuid}).update({
            userUuid: user.userUuid,
            startedAt: getNow(),
        })

        await sendMail({
            sender: EMAIL_DEFAULT_SENDER,
            receiver: user.email,
            subject: email_notify_accept_task_subject(page.title),
            body: email_notify_accept_task_body(
                {
                    pageTitle: page.title,
                    title: pageItem.title,
                    subtitle: pageItem.subTitle,
                    link_task: getFrontendActUrl(
                        {
                            action: Action.stop,
                            pageItemProgressUuid: pageItemProgress.pageItemProgressUuid,
                            userUuid: user.userUuid,
                        },
                        true
                    ),
                    link_stop: getFrontendPageItemProgressUrl(
                        {pageItemProgressUuid: pageItemProgress.pageItemProgressUuid},
                        true
                    ),
                    annotationText: pageItemProgress.annotation,
                }
            ),
        })
    } else if (action === 'stop') {
        await pg('pageItemProgress').where({pageItemProgressUuid}).update({
            userUuid: user.userUuid,
            finishedAt: getNow(),
        })

        await sendMail({
            sender: EMAIL_DEFAULT_SENDER,
            receiver: user.email,
            subject: email_notify_done_task_subject(page.title),
            body: email_notify_done_task_body({
                pageTitle: page.title,
                title: pageItem.title,
                subtitle: pageItem.subTitle,
                link_task: getFrontendPageItemProgressUrl(
                    {pageItemProgressUuid: pageItemProgress.pageItemProgressUuid},
                    true
                ),
                annotationText: pageItemProgress.annotation
            })
        })
    }

    const responseData: GetActResponseOk = {
        status: 'OK',
    }
    return reply.send(responseData)
}
