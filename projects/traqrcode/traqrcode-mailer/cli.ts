//https://stackoverflow.com/questions/59813513/how-to-run-nestjs-console-commands-in-context-of-angular-nx-workspace

import { Command } from 'commander'

const program = new Command()

program.version('0.0.1').description('Send emails manually')

program
  .command('mail')
  .arguments('<subject> <message>')
  .description('send an email to localhost', {
    subject: 'Subject of the email',
    message: 'Message of the email',
  })
  .action((...args) => {
    const subject = args[0]
    const message = args[1]
    console.log(subject, message)
  })

program.parse(process.argv)
