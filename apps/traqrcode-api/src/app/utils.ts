import { HttpResponse } from 'uWebSockets.js'

export const readJson = (res: HttpResponse, cb: any, err: any) => {
  let buffer: Buffer = Buffer.concat([])

  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)

    buffer = Buffer.concat([buffer, chunk])

    if (isLast) {
      let json
      try {
        json = JSON.parse(buffer.toString())
      } catch (e) {
        /* res.close calls onAborted */
        res.close()
        return
      }
      cb(json)
    }
  })

  /* Register error cb */
  res.onAborted(err)
}

export const toJson = (res: HttpResponse) =>
  new Promise((success, error) => readJson(res, success, error))

export const log = (...args: string[]) => {
  process.stdout.write(args.join(' ') + '\n')
}

export const getFileExtension = (p: string) => {
  return p.split('.').pop()
}
