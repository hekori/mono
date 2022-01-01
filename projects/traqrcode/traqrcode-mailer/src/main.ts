import { Options, SMTPServer } from 'smtp-server'
import { HTTP_SMTP_PORT } from './settings'

const options: Options = {
  secure: false,
  logger: true,
}

const smtpServer = new SMTPServer(options)

// Run the SmtpServer
const startSmtpServer = async () => {
  try {
    await smtpServer.listen(HTTP_SMTP_PORT)
  } catch (err) {
    process.exit(1)
  }
}
void startSmtpServer()
