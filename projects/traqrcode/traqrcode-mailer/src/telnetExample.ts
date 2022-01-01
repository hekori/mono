const Telnet = require('telnet-client')
import { HTTP_SMTP_PORT } from './settings'

export async function runTelnetExample() {
  const connection = new Telnet()

  // these parameters are just examples and most probably won't work for your use-case.
  const params = {
    host: '127.0.0.1',
    port: HTTP_SMTP_PORT,
    negotiationMandatory: false,
    // shellPrompt: '/ # ', // or negotiationMandatory: false
    timeout: 1500,
  }

  // try {
  await connection.connect(params)
  // } catch (error) {
  //   // handle the throw (timeout)
  // }

  const res = await connection.exec(`HELO 127.0.0.1
MAIL From: <myemail@mydomain>
RCPT To: <user@domain.com>
DATA
From: myemail@mydomain
To: user@domain.com
Subject: Testing

This is a test
.
QUIT
`)
  console.log('async result:', res)
}
