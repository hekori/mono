//https://stackoverflow.com/questions/59813513/how-to-run-nestjs-console-commands-in-context-of-angular-nx-workspace

import { Command } from 'commander'
import { sendMail } from './src/scripts/sendMailExample'

const program = new Command()

program.version('0.0.1').description('Send emails manually')

program
  .command('mail')
  .arguments('<subject> <body>')
  .description('send an email to localhost', {
    subject: 'Subject of the email',
    body: 'Message of the email',
  })
  .action((...args) => {
    const subject = args[0]
    const body = args[1]
    console.log(subject, body)
    void sendMail({
      sender: 'sender@traqrcode.com',
      receiver: 'receiver@traqrcode.com',
      subject,
      body,
    })
  })

program.parse(process.argv)
