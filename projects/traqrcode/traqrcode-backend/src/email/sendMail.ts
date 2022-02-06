import { log } from '../utils/utils'
import {
  DKIM_DOMAIN_NAME,
  DKIM_PRIVATE_KEY,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from '../settings'

import * as nodemailer from 'nodemailer'
import { STAGE } from '@hekori/traqrcode-common'
import { randomUUID } from 'crypto'

interface SendMailArgs {
  sender: string
  receiver: string
  subject: string
  body: string
  host?: string
  port?: number
  user?: string
  pass?: string
  dkimDomainName?: string
  dkimPrivateKey?: string
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
  dkimDomainName = DKIM_DOMAIN_NAME,
  dkimPrivateKey = DKIM_PRIVATE_KEY,
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

    // https://nodemailer.com/transports/sendmail/
    // https://nodemailer.com/dkim/

    let transporter
    if (host && port && user && pass) {
      transporter = nodemailer.createTransport({
        pool: true,
        host,
        port,
        secure: true, // use TLS
        auth: {
          user,
          pass,
        },
      })
    } else {
      log('using dkim private key')
      log('using dkim selector "mail"')
      log(`using DKIM_DOMAIN_NAME=${dkimDomainName}`)

      if (dkimDomainName === undefined) log('dkimDomainName is undefined')

      transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail',
        dkim: {
          domainName: dkimDomainName,
          keySelector: 'mail',
          privateKey: dkimPrivateKey,
        },
      })
    }

    log('prepare message')
    const message = {
      from: sender,

      // Comma separated list of recipients
      to: receiver,

      // Subject of the message
      subject: subject,

      // plaintext body
      text: body,

      // delivery status notifications
      dsn: {
        id: randomUUID(),
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: 'info@traqrcode.com',
      },
    }

    log('send message')
    const info = await transporter.sendMail(message)
    log(`Message sent successfully as ${info.messageId}`)
    log(`${JSON.stringify(info.envelope)}`)
  }
}
