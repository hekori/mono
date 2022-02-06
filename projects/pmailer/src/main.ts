import * as net from 'net'
import {AddressInfo} from 'net'
import {HTTP_SMTP_PORT} from './settings'
import {
  deleteAllObjectAttributes,
  extractCommand,
  parseEHLO,
  parseMAILFROM,
  response220ServiceReady,
  response221ClosingChannel,
  response250Ok,
  response500UnknownCommand,
  response501SyntaxError,
  response503BadSequenceOfCommands,
  validateDomain,
} from './smtpCommands'

class SmtpServer {
  server: net.Server
  constructor() {
    this.server = net.createServer()

    this.server.on('listening', () => {
      const address = this.server.address() as AddressInfo
      const port = address.port
      const family = address.family
      const ipaddr = address.address
      console.log('Server is listening')
      console.log('IP: ' + ipaddr)
      console.log('Port: ' + port)
      console.log('Server is IP4/IP6: ' + family)
    })

    this.server.on('connection', this.onReceive)
  }

  onReceive(socket) {
    interface Checklist {
      domain?: string
      mailFrom?: string
    }

    type State =
      | 'EHLO'
      | 'VRFY'
      | 'EXPN'
      | 'MAIL'
      | 'RCPT'
      | 'DATA'
      | 'QUIT'
      | 'DONE'

    const checkList: Checklist = {}
    let state:State = 'EHLO'

    socket.write(response220ServiceReady)

    socket.on('data', (data: string | Buffer) => {
      const line = data.toString()
      console.log('-'.repeat(20))
      console.log('state: ', state)
      console.log('line: ', line)

      // const bytesRead = socket.bytesRead
      // const bytesWritten = socket.bytesWritten
      // console.log('Bytes read : ' + bytesRead)
      // console.log('Bytes written : ' + bytesWritten)
      // console.log('Data sent to server : ' + data)

      // https://de.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol

      // resetting commands
      const command = extractCommand(line)
      switch (command) {
        case 'RSET':
          deleteAllObjectAttributes(checkList)
          state = 'EHLO'
          break
        case 'EHLO':
          deleteAllObjectAttributes(checkList)
          state = 'EHLO'
      }

      // Order of commands: https://datatracker.ietf.org/doc/html/rfc2821#section-4.1.4
      switch (state) {
        case 'HELO': // HELO foobar.example.com
        case 'EHLO': // EHLO foobar.example.com
          if (command != state) socket.write(response503BadSequenceOfCommands)
          const ehlo = parseEHLO(line)
          if (validateDomain(ehlo.domain)) {
            checkList.domain = ehlo.domain
            socket.write(response250Ok)
            state = 'MAIL'
          } else {
            socket.write(response501SyntaxError)
          }
          break
        case 'MAIL': // MAIL FROM:<sender@example.org>
          const mailFrom = parseMAILFROM(line)
          checkList.mailFrom = mailFrom.email
          socket.write(response250Ok)
          state = 'RCPT'
          break
        case 'RCPT': // RCPT TO:<receiver@example.com>
          if (!checkList.mailFrom) {
            socket.write(response503BadSequenceOfCommands)
          }
          socket.write(response250Ok)
          state = 'DATA'
          break
        case 'DATA': // DATA
          // TODO: detect CRLF.CRLF
          socket.write(response250Ok)
          state = 'QUIT'

          break

        case 'QUIT': // DATA
          socket.write(response221ClosingChannel)
          state = 'DONE'
          break

        case 'DONE': // NOTHING TO DO ANYMORE
          socket.end('Goodbye')
          break

        default:
          socket.write(response500UnknownCommand)
      }
    })
  }

  listen() {
    this.server.listen(HTTP_SMTP_PORT, '0.0.0.0')
  }
}

const smtpServer = new SmtpServer()
smtpServer.listen()
