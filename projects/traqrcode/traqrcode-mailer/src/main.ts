import { Options, SMTPServer } from 'smtp-server'

const options: Options = {
  secure: true,
}

const smtpServer = new SMTPServer(options)

// Run the SmtpServer
const startSmtpServer = async () => {
  try {
    await smtpServer.listen(465)
  } catch (err) {
    process.exit(1)
  }
}
void startSmtpServer()
