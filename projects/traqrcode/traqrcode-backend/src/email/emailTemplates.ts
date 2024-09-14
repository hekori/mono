export const emailLoginSubject = () => `[TRAQRCODE] Your login token`

export const emailLoginBody = ({
                                   loginUrl,
                               }: {
    loginUrl: string
}) => `Click the link to login to TRAQRCODE
${loginUrl}
and manage your QR codes.
`

export const email_notify_admin_of_new_req_subject = () =>
    `[TRAQRCODE] New PDF created`

export const email_notify_admin_of_new_req_body = (
    link_edit: string,
    link_pdf: string
) => `You have created a new PDF

You can edit the PDF it at any time here
${link_edit}
and download the PDF for printing here
${link_pdf}
`

export const email_notify_receiver_of_new_task_subject = () =>
    '[TRAQRCODE] New request'

export const email_notify_receiver_of_new_task_body = ({
                                                           pageTitle,
                                                           title,
                                                           subtitle,
                                                           annotation,
                                                           link_start,
                                                           link_task,
                                                       }: {
    pageTitle: string,
    title: string,
    subtitle: string,
    annotation: string,
    link_start: string,
    link_task: string,
}) => {

    return `A request has been made
    
---------------------------------------
page title: ${pageTitle}
QR title: ${title}
QR subtitle: ${subtitle}
annotation: ${annotation}
---------------------------------------

Click the link to accept
${link_start}

You can view the current status of the task here
${link_task}
`

}

export const email_notify_accept_task_subject = () =>
    `[TRAQRCODE] You have accepted the task`

export const email_notify_accept_task_body = ({
                                                  pageTitle,
                                                  title,
                                                  subtitle,
                                                  link_stop,
                                                  link_task,
                                                  annotationText,
                                              }: {
    pageTitle: string,
    title: string,
    subtitle: string,
    link_stop: string,
    link_task: string,
    annotationText: string,
}) => `You have accepted the task

---------------------------------------
page title: ${pageTitle}
QR title: ${title}
QR subtitle: ${subtitle}
annotation: ${annotationText}
---------------------------------------

Click the following link to complete the task
${link_task}

You can view the current status of the task here
${link_stop}
`

export const email_notify_done_task_subject = () =>
    '[TRAQRCODE] You have finished the task'

export const email_notify_done_task_body = ({
                                                pageTitle,
                                                title,
                                                subtitle,
                                                link_task,
                                                annotationText,
                                            }: {
    pageTitle: string,
    title: string,
    subtitle: string,
    link_task: string,
    annotationText: string,
}) => `You have finished the task
---------------------------------------
page title: ${pageTitle}
QR title: ${title}
QR subtitle: ${subtitle}
annotation: ${annotationText}
---------------------------------------

You can view the current status of the task here
${link_task}
`
