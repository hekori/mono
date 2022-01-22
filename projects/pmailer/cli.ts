//https://stackoverflow.com/questions/59813513/how-to-run-nestjs-console-commands-in-context-of-angular-nx-workspace

import { Command } from 'commander'
import { sendTelnet } from './src/scripts/sendTelnetExample'

const program = new Command()

program.version('0.0.1').description('Send emails manually')

program
  .command('sendTelnet')
  .arguments('<subject> <body>')
  .description('send an email via sendmail', {
    sender: 'Sender of the email',
    receiver: 'receiver of the email',
    subject: 'Subject of the email',
    body: 'Message of the email',
  })
  .action((...args) => {
    const sender = args[0]
    const receiver = args[1]
    const subject = args[2]
    const body = args[3]
    console.log(subject, body)
    void sendTelnet({ sender, receiver, subject, body })
  })

program.parse(process.argv)
