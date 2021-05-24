import {
  App,
  HttpRequest,
  HttpResponse,
  RecognizedString,
  SSLApp,
  TemplatedApp,
} from 'uWebSockets.js'
import { log } from './utils'
import { FileStream } from './api.file'
import * as path from 'path'
import { existsSync } from 'fs'
import {
  SSL_PRIVATE_KEY_PATH,
  SSL_PUBLIC_CERT_PATH,
  STATIC_DIR,
} from './settings'
import { STAGE } from '../../../traqrcode-common/src/settings'
import { to } from '../../../traqrcode-common/src/misc'
import { API_CODE } from '../../../traqrcode-common/src/constants'

export type MyHttpResponse = HttpResponse

export type MyHttpRequest = HttpRequest

export enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  ANY = 'ANY',
}

export class Api {
  app: TemplatedApp
  PORT: number

  fileStream: FileStream
  constructor(useSSL: boolean, PORT: number) {
    log(
      `Create api instance ${
        useSSL ? 'using SSL ' : ''
      } on PORT ${PORT} for STAGE=${STAGE}`
    )

    if (useSSL) {
      this.app = SSLApp({
        key_file_name: SSL_PRIVATE_KEY_PATH,
        cert_file_name: SSL_PUBLIC_CERT_PATH,
      })
    } else {
      this.app = App()
    }

    this.PORT = PORT
    this.fileStream = new FileStream()

    this.app.options('/*', (res: HttpResponse, req: HttpRequest) => {
      console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)
      res.writeHeader('Access-Control-Allow-Origin', '*')
      res.writeHeader('Access-Control-Allow-Headers', 'content-type')
      res.writeHeader('Access-Control-Allow-Credentials', 'true')
      res.writeHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, DELETE'
      )
      res.end()
    })
  }

  // FIXME: this should be a method of MyHttpResponse
  send(res: HttpResponse, data: any): HttpResponse {
    res.writeHeader('Access-Control-Allow-Origin', '*')
    res.writeHeader('Content-Type', 'application/json')
    const body = JSON.stringify(data)
    if (!res.aborted) res.end(body)
    return res
  }

  // FIXME: this should be a method of MyHttpResponse
  sendRaw(res: HttpResponse, data: Buffer = Buffer.from([])): HttpResponse {
    res.writeHeader('Access-Control-Allow-Origin', '*')
    if (!res.aborted) res.end(data)
    return res
  }

  // FIXME: this should be a method of MyHttpResponse
  /** filePath is relative to STATIC_DIR */
  sendFile(res: HttpResponse, filePath: string): HttpResponse {
    res.writeHeader('Access-Control-Allow-Origin', '*')
    const absPath = path.join(STATIC_DIR, filePath)

    if (existsSync(absPath) && !res.aborted)
      this.fileStream.pipeStreamOverResponse(res, absPath)
    else {
      throw new Error('File not found')
    }
    return res
  }

  request(
    method: HttpMethod,
    pattern: RecognizedString,
    myHandler: (myRes: MyHttpResponse, myReq: MyHttpRequest) => Promise<any>
  ): TemplatedApp {
    const handler = async (res: HttpResponse, req: HttpRequest) => {
      // if (this.redirectToHttps(res, req)) return

      // catch async/await errors
      res.onAborted(() => {
        res.aborted = true
      })

      const [err, result] = await to(myHandler(res, req))

      if (err) {
        this.send(res, { [API_CODE.status]: API_CODE.ERROR })
      } else {
        return result
      }
    }

    switch (method) {
      case HttpMethod.GET:
        return this.app.get(pattern, handler)
      case HttpMethod.POST:
        return this.app.post(pattern, handler)
      default:
        return this.app.any(pattern, handler)
    }
  }

  get(
    pattern: RecognizedString,
    myHandler: (myRes: MyHttpResponse, myReq: MyHttpRequest) => Promise<any>
  ): TemplatedApp {
    return this.request(HttpMethod.GET, pattern, myHandler)
  }

  post(
    pattern: RecognizedString,
    myHandler: (myRes: MyHttpResponse, myReq: MyHttpRequest) => Promise<any>
  ): TemplatedApp {
    return this.request(HttpMethod.POST, pattern, myHandler)
  }

  any(
    pattern: RecognizedString,
    myHandler: (myRes: MyHttpResponse, myReq: MyHttpRequest) => Promise<any>
  ): TemplatedApp {
    return this.request(HttpMethod.ANY, pattern, myHandler)
  }

  redirectToHttps(res: MyHttpResponse, req: MyHttpRequest, NEWPORT: number) {
    const host = req.getHeader('host')
    const url = req.getUrl()
    res.writeStatus('302')
    res.writeHeader(
      'location',
      `https://${host.replace(`${this.PORT}`, `${NEWPORT}`)}${url}`
    )
    this.sendRaw(res)
  }

  listen() {
    this.app.listen(this.PORT, (token) => {
      if (token) {
        console.log('Listening to PORT ' + this.PORT)
      } else {
        console.log('Failed to listen to PORT ' + this.PORT)
      }
    })
  }
}
