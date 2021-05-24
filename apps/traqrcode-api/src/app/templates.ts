export const email_notify_admin_of_new_req_subject = () =>
  `[REQNOW] New PDF created`

export const email_notify_admin_of_new_req_body = (
  link_edit: string,
  link_pdf: string,
) => `You have created a new PDF

You can edit the PDF it at any time here
${link_edit}
and download the PDF for printing here
${link_pdf}
`

export const email_notify_receiver_of_new_task_subject = () =>
  '[REQNOW] New request'

export const email_notify_receiver_of_new_task_body = (
  title: string,
  subtitle: string,
  link_start: string,
  link_task: string,
) => `A request for
${title}
${subtitle}
has been made.

Click the link to accept
${link_start}

You can view the current status of the task here
${link_task}
`

export const email_notify_accept_task_subject = () =>
  `[REQNOW] You have accepted the task`

export const email_notify_accept_task_body = (
  title: string,
  subtitle: string,
  link_stop: string,
  link_task: string,
) => `You have accepted the task
${title}
${subtitle}

Click the following link to complete the task
${link_stop}

You can view the current status of the task here
${link_task}

`

export const email_notify_done_task_subject = () =>
  '[REQNOW] You have finished the task'

export const email_notify_done_task_body = (
  title: string,
  subtitle: string,
  link_task: string,
) => `You have finished the task
${title}
${subtitle}

You can view the current status of the task here
${link_task}
`
