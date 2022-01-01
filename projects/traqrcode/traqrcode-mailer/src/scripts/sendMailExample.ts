import * as nodemailer from 'nodemailer'

const log = (...args: string[]) => {
  process.stdout.write(args.join(' ') + '\n')
}

interface SendMailArgs {
  sender: string
  receiver: string
  subject: string
  body: string
  dkimDomainName?: string
  dkimPrivateKey?: string
}

export const sendMail = async ({
  sender,
  receiver,
  subject,
  body,
}: SendMailArgs) => {
  log('='.repeat(80))
  log('EMAIL:', subject)
  log('='.repeat(80))
  log('FROM:', sender)
  log('TO:', receiver)
  log('-'.repeat(80))
  log(body)
  log('-'.repeat(80))

  log('create transporter')
  // https://nodemailer.com/transports/sendmail/
  // https://nodemailer.com/dkim/
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
  })

  log('prepare message')
  const message = {
    from: sender,

    // Comma separated list of recipients
    to: receiver,

    // Subject of the message
    subject: subject,

    // plaintext body
    text: body,
  }

  log('send message')
  const info = await transporter.sendMail(message)
  log(`Message sent successfully as ${info.messageId}`)
  log(`${JSON.stringify(info.envelope)}`)
}
