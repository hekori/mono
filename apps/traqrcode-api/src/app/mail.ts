import { log } from './utils'

const nodemailer = require('nodemailer')

import { STAGE } from '../../common/src/settings'
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from './settings'

interface SendMailArgs {
  sender: string
  receiver: string
  subject: string
  body: string
  host?: string
  port?: string
  user?: string
  pass?: string
}

export const sendMail = async ({
  sender,
  receiver,
  subject,
  body,
  host = SMTP_HOST,
  port = SMTP_PORT,
  user = SMTP_USER,
  pass = SMTP_PASS,
}: SendMailArgs) => {
  log('='.repeat(80))
  log('EMAIL:', subject)
  log('='.repeat(80))
  log('FROM:', sender)
  log('TO:', receiver)
  log('-'.repeat(80))
  log(body)
  log('-'.repeat(80))

  if (STAGE !== 'DEV') {
    log('create transporter')
    log('using dkim private key')
    log('using dkim selector "mail"')
    log(`using DKIM_DOMAIN_NAME=${process.env.DKIM_DOMAIN_NAME}`)

    if (process.env.DKIM_PRIVATE_KEY === undefined)
      log('process.env.DKIM_PRIVATE_KEY is undefined')

    // https://nodemailer.com/transports/sendmail/
    // https://nodemailer.com/dkim/

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
      dkim: {
        domainName: process.env.DKIM_DOMAIN_NAME,
        keySelector: 'mail',
        privateKey: process.env.DKIM_PRIVATE_KEY,
      },
    })

    log('prepare message')
    let message = {
      from: sender,

      // Comma separated list of recipients
      to: receiver,

      // Subject of the message
      subject: subject,

      // plaintext body
      text: body,
    }

    log('send message')
    let info = await transporter.sendMail(message)
    log(`Message sent successfully as ${info.messageId}`)
    log(`${JSON.stringify(info.envelope)}`)
  }
}
