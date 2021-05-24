import { sendMail } from '../mail'
import { log } from '../utils'
import { SMTP_HOST, SMTP_PORT, SMTP_USER } from '../settings'
import { STAGE } from '../../../../traqrcode-common/src/settings'

describe('sendMail', () => {
  it('should send email', async () => {
    log('STAGE:', STAGE)
    log('SMTP_HOST:', SMTP_HOST)
    log('SMTP_PORT:', SMTP_PORT)
    log('SMTP_USER:', SMTP_USER)

    await sendMail({
      sender: 'info@hekori.com',
      receiver: 'sebastian.walter@gmail.com',
      subject: 'subject',
      body: 'body',
    })
  })
})
