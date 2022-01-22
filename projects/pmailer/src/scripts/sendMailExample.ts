import * as nodemailer from 'nodemailer'
import { SendMailArgs } from './sendEmail.types'

const log = (...args: string[]) => {
  process.stdout.write(args.join(' ') + '\n')
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
    // sendmail: true,
    // newline: 'unix',
    // path: '/usr/sbin/sendmail',
    host: 'localhost',
    port: 8025,
    secure: false,
    ignoreTLS: true,
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
