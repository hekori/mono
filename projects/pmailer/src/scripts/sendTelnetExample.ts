import { SendMailArgs } from './sendEmail.types'
import { HTTP_SMTP_PORT } from '../settings'

const Telnet = require('telnet-client')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const sendTelnet = async ({
  sender,
  receiver,
  subject,
  body,
}: SendMailArgs) => {
  const connection = new Telnet()

  const DOMAIN = sender.split('@')[1]
  const MXSERVER = 'alt1.aspmx.l.google.com'

  // these parameters are just examples and most probably won't work for your use-case.
  const params = {
    host: MXSERVER,
    port: HTTP_SMTP_PORT,
    negotiationMandatory: false,
    // shellPrompt: '/ # ', // or negotiationMandatory: false
    timeout: 1500,
  }

  console.log('connecting to server...')

  try {
    await connection.connect(params)
  } catch (error) {
    // handle the throw (timeout)
    console.error('There was an error connecting to the server.')
  }
  console.log('Done.')

  await delay(100)

  let res, cmd

  cmd = `EHLO ${MXSERVER}`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  cmd = `MAIL From: <${sender}>`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  cmd = `RCPT To: <${receiver}>`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  cmd = `DATA`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  cmd = `Subject: ${subject}`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  // blank line after subject
  cmd = ``
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  // send body
  cmd = `${body}`
  console.log(`Sending:`, cmd)
  res = await connection.send(cmd)
  console.log('async result:', res)

  // blank line
  res = await connection.send('')
  console.log('async result:', res)
  // .
  res = await connection.send('.')
  console.log('async result:', res)
  // blank line
  res = await connection.send('')
  console.log('async result:', res)

  res = await connection.send('QUIT')
  console.log('async result:', res)

  // MAIL From: <myemail@mydomain>
  // RCPT To: <user@domain.com>
  // DATA
  // From: myemail@mydomain
  // To: user@domain.com
  // Subject: Testing
  //
  // This is a test
  //     .
  //     QUIT
}
