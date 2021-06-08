import { deleteOldReqs } from './cron'
import { log, toJson } from './utils'
import {
  createHash,
  getOrCreateTask,
  getUnusedShortHash,
  readReq,
  writeReq,
} from './core'
import { sendMail } from './mail'
import {
  email_notify_accept_task_body,
  email_notify_accept_task_subject,
  email_notify_admin_of_new_req_body,
  email_notify_admin_of_new_req_subject,
  email_notify_done_task_body,
  email_notify_done_task_subject,
  email_notify_receiver_of_new_task_body,
  email_notify_receiver_of_new_task_subject,
} from './templates'
import { Api, MyHttpRequest, MyHttpResponse } from './api'
import {
  EMAIL_DEFAULT_SENDER,
  PORT,
  PROJECT_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SSL_PORT,
  SSL_PRIVATE_KEY_PATH,
  SSL_PUBLIC_CERT_PATH,
  STATIC_DIR,
  STORE_DIR,
} from './settings'

import * as QRCode from 'qrcode'
import {
  Action,
  API_CODE,
  BACKEND_URL,
  FRONTEND_URL,
  getBackendCreatePostUrl,
  getBackendEditPostUrl,
  getBackendPdfUrl,
  getFrontendActUrl,
  getFrontendEditUrl,
  getFrontendReadUrl,
  getFrontendTaskUrl,
  InitialPageEditErrors,
  PageEditErrors,
  PostCreateRequest,
  Req,
  shortuuid,
  STAGE,
  TaskStep,
  to,
} from '@hekori/traqrcode-common'
import { getDate, isoDatetimeFormatter } from '@hekori/dates'
import pdfkit = require('pdfkit')

console.log('-'.repeat(80))
console.log('STAGE=', STAGE)
console.log('PROJECT_DIR=', PROJECT_DIR)
console.log('STORE_DIR=', STORE_DIR)
console.log('STATIC_DIR=', STATIC_DIR)
console.log('FRONTEND_URL=', FRONTEND_URL)
console.log('BACKEND_URL=', BACKEND_URL)
console.log('SMTP_HOST=', SMTP_HOST)
console.log('SMTP_PORT=', SMTP_PORT)
console.log('SMTP_USER=', SMTP_USER)
console.log('EMAIL_DEFAULT_SENDER=', EMAIL_DEFAULT_SENDER)
console.log('SSL_PRIVATE_KEY_PATH=', SSL_PRIVATE_KEY_PATH)
console.log('SSL_PUBLIC_CERT_PATH=', SSL_PUBLIC_CERT_PATH)
console.log('SSL_PORT=', SSL_PORT)
console.log('PORT=', PORT)
console.log('-'.repeat(80))

// redirectApi.any('/*', async (res: MyHttpResponse, req: MyHttpRequest) => {
//   log('matched redirectApi')
//
//   log(' req.getUrl()', req.getUrl())
//   req.forEach((key: string, value: string) => {
//     console.log(`${key}: ${value}`)
//   })
//
//   redirectApi.redirectToHttps(res, req, SSL_PORT)
// })
//
// redirectApi.listen()

const api = new Api(false, PORT)

// api.any('/*', async (res, req) => {
//   console.log('called HTTP to HTTPS redirect')
//   console.log(`${req.getMethod()}: ${req.getUrl()}, ${req.getQuery()}`)
//
//   req.forEach((key: string, value: string) => {
//     console.log(`${key}: ${value}`)
//   })
//
//   res.
//
//   // if (STAGE === 'DEV' && req.getHeader('Upgrade-Insecure-Requests')) {
//   //   const referer = req.getHeader('referer')
//   //   const newReferer = referer.replace('http://', 'https://')
//   //   res.writeStatus('302')
//   //   res.writeHeader('location', newReferer)
//   //   res.end()
//   //   return
//   // }
// })

api.post(
  getBackendCreatePostUrl(),
  async (res: MyHttpResponse, req: MyHttpRequest) => {
    console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)
    const [, response] = await to(toJson(res))
    const data = response as PostCreateRequest
    console.log(data)

    let errors = {}

    if (!data.admin.includes('@')) {
      errors = { ...errors, admin: API_CODE.ERROR_INVALID_EMAIL }
    }

    if (Object.keys(errors).length > 0) {
      res.writeStatus('400')
      return api.send(res, {
        [API_CODE.status]: API_CODE.ERROR,
        [API_CODE.errors]: errors,
      })
    }

    const now = getDate()

    const s = shortuuid()

    const r: Req = {
      admin: data.admin,
      createdAt: isoDatetimeFormatter(now),
      accessToken: createHash(),
      shortHash: getUnusedShortHash(),
      test: false,
      idToItem: {},
      idToWorker: { [s]: data.admin },
      workerIds: [s],
      itemIds: [],
    }
    writeReq(r.shortHash, r)

    to(
      sendMail({
        sender: EMAIL_DEFAULT_SENDER,
        subject: email_notify_admin_of_new_req_subject(),
        receiver: data.admin,
        body: email_notify_admin_of_new_req_body(
          getFrontendEditUrl(
            {
              shortHash: r.shortHash,
              accessToken: r.accessToken,
            },
            true
          ),
          getBackendPdfUrl({ shortHash: r.shortHash }, true)
        ),
      })
    )

    return api.send(res, {
      [API_CODE.status]: API_CODE.OK,
      // FIXME: should be {status: ..., postCreateResponse: ....} PostCreateResponse
      shortHash: r.shortHash,
      accessToken: r.accessToken,
    })
  }
)

api.get('/view/:shortHash/:accessToken', async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const shortHash = req.getParameter(0)
  const accessToken = req.getParameter(1)

  try {
    const d: Req = readReq(shortHash)
    return api.send(res, { status: API_CODE.OK, data: d })
  } catch (e) {
    return api.send(res, {
      [API_CODE.status]: API_CODE.ERROR,
      [API_CODE.errors]: {
        ...InitialPageEditErrors,
        count: 1,
        global: [API_CODE.ERROR_NOT_FOUND],
      },
    })
  }
})

api.post(getBackendEditPostUrl(), async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const [, response] = await to(toJson(res))

  const n = response as Req

  let errors: PageEditErrors = {
    count: 0,
    global: [],
    idToWorker: {},
    idToItem: {},
  }

  let o: Req
  try {
    o = readReq(n.shortHash)
  } catch (e) {
    return api.send(res, {
      [API_CODE.status]: API_CODE.ERROR,
      [API_CODE.errors]: {
        ...errors,
        count: errors.count + 1,
        global: [...errors.global, API_CODE.ERROR_NOT_FOUND],
      },
    })
  }

  log('receiverids')
  log(...n.workerIds)

  // process workers
  for (const workerId of n.workerIds) {
    if (!n.idToWorker[workerId].includes('@')) {
      errors = {
        ...errors,
        count: errors.count + 1,
        idToWorker: {
          ...errors.idToWorker,
          [workerId]: [API_CODE.ERROR_INVALID_EMAIL],
        },
      }
    }
  }
  if (n.workerIds.length === 0) {
    errors = {
      ...errors,
      count: errors.count + 1,
      global: [...errors.global, API_CODE.ERROR_EMPTY_WORKER_LIST],
    }
  }

  o.workerIds = [...n.workerIds]
  o.idToWorker = { ...o.idToWorker, ...n.idToWorker }

  // process items
  for (const itemId of n.itemIds) {
    const item = n.idToItem[itemId]

    if (item.taskIds === undefined) item.taskIds = []
    if (item.idToTask === undefined) item.idToTask = {}

    const newErrors = []
    if (item.title.length === 0) newErrors.push(API_CODE.ERROR_EMPTY_TITLE)
    if (item.title.length > 25) newErrors.push(API_CODE.ERROR_TITLE_TOO_LONG)
    if (item.subTitle.length > 100)
      newErrors.push(API_CODE.ERROR_SUBTITLE_TOO_LONG)

    if (newErrors.length > 0) {
      errors = {
        ...errors,
        count: errors.count + 1,
        idToItem: {
          ...errors.idToItem,
          [itemId]: newErrors,
        },
      }
    }
  }
  if (n.itemIds.length === 0) {
    errors = {
      ...errors,
      count: errors.count + 1,
      global: [...errors.global, API_CODE.ERROR_EMPTY_ITEMS_LIST],
    }
  }

  o.itemIds = [...n.itemIds]
  o.idToItem = { ...o.idToItem, ...n.idToItem }

  if (errors.count > 0) {
    res.writeStatus('400')
    api.send(res, {
      [API_CODE.status]: API_CODE.ERROR,
      [API_CODE.errors]: errors,
    })
    return
  }

  writeReq(o.shortHash, o)

  return api.send(res, { [API_CODE.status]: API_CODE.OK })
})

api.get('/pdf/:shortHash', async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const shortHash = req.getParameter(0)
  const r: Req = readReq(shortHash)

  const doc = new pdfkit({ autoFirstPage: false, bufferPages: true })

  const buffers: any[] = []
  doc.on('data', buffers.push.bind(buffers))
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers)
    api.sendRaw(res, pdfData)
  })

  const filename = 'myfilename'
  // Stripping special characters
  // filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  // res.writeHeader(
  //   'Content-disposition',
  //   'attachment; filename="' + filename + '"',
  // )
  res.writeHeader('Content-type', 'application/pdf')

  const mm = (x: number) => x * 0.0393701 * 72 // millimeter to point
  const PAGE_WIDTH = mm(210)
  const PAGE_HEIGHT = mm(297)
  const PAGE_MARGIN = mm(20)
  const BOX_PADDING = mm(5)
  const ITEMS_PER_PAGE = 4
  const BOX_HEIGHT = mm(40)
  const HEADER_HEIGHT = mm(60)

  const QR_X = PAGE_MARGIN
  const QR_Y = PAGE_HEIGHT - mm(50)
  const QR_W = mm(20)
  const QR_H = mm(20)

  const writeHeaderAndFooter = async () => {
    // HEADER
    doc.save()
    doc.fontSize(60)
    doc.text('Scan', mm(20), mm(20))
    doc.fontSize(26)
    doc.text('the QR code with your mobile phone', mm(20), mm(40))

    // FOOTER
    let dataUrl
    try {
      dataUrl = await QRCode.toDataURL(FRONTEND_URL)
    } catch (e) {
      console.error(e)
    }
    doc
      .image(dataUrl, QR_X, QR_Y, { fit: [QR_W, QR_H] })
      .rect(QR_X, QR_Y, QR_W, QR_H)
      .stroke()

    doc.fontSize(26)
    doc.text('or create your own', QR_X + QR_W + mm(6), QR_Y)
    doc.fontSize(18)
    doc.text(`${FRONTEND_URL}`, QR_X + QR_W + mm(6), QR_Y + mm(12))

    doc.restore()
  }

  if (r.itemIds.length === 0) {
    doc.addPage({ margin: 0, padding: 0, size: [PAGE_WIDTH, PAGE_HEIGHT] })
    await writeHeaderAndFooter()
    const yoffset = HEADER_HEIGHT

    doc.save()
    doc.fontSize(26)
    doc.fill('black')
    doc.text('Error: No QR codes found', PAGE_MARGIN, yoffset + mm(6))
    doc.fontSize(18)
    doc.text('Please add at least one QR code', PAGE_MARGIN, yoffset + mm(18), {
      width: PAGE_WIDTH - 2 * PAGE_MARGIN - 2 * QR_X - 2 * mm(6),
    })
  }

  for (let i = 0; i < r.itemIds.length; i++) {
    const itemId = r.itemIds[i]
    const item = r.idToItem[r.itemIds[i]]

    const j = i % ITEMS_PER_PAGE
    if (j === 0) {
      doc.addPage({ margin: 0, size: [PAGE_WIDTH, PAGE_HEIGHT] })
      await writeHeaderAndFooter()
    }

    // items
    const yoffset = (BOX_HEIGHT + BOX_PADDING) * j + HEADER_HEIGHT

    doc.save()
    doc.fontSize(26)
    doc.fill('black')
    doc.text(item.title, PAGE_MARGIN + mm(6), yoffset + mm(6))
    doc.fontSize(18)
    doc.text(item.subTitle, PAGE_MARGIN + mm(6), yoffset + mm(18), {
      width: PAGE_WIDTH - 2 * PAGE_MARGIN - 2 * QR_X - 2 * mm(6),
    })
    doc.restore()
    doc.save()
    doc.fontSize(9)
    doc.text(
      getFrontendReadUrl({ shortHash: r.shortHash, itemId }, true),
      PAGE_MARGIN + mm(6),
      yoffset + mm(34)
    )
    doc.restore()

    const [err, dataUrl] = await to(
      QRCode.toDataURL(
        getFrontendReadUrl({ shortHash: r.shortHash, itemId }, true)
      )
    )
    doc
      .image(dataUrl, PAGE_WIDTH - PAGE_MARGIN - 2 * QR_W, yoffset, {
        fit: [2 * QR_W, 2 * QR_H],
      })
      .rect(QR_X, QR_Y, QR_W, QR_H)

    // req.id2item[item].title,

    doc.save()
    doc.rect(PAGE_MARGIN, yoffset, PAGE_WIDTH - 2 * PAGE_MARGIN, BOX_HEIGHT)
    doc.stroke('black')
    doc.restore()
  }
  // doc.save()
  // doc
  //   .scale(0.6)
  //   .translate(12, 40)
  //   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  //   .fill('red', 'even-odd')
  // doc.restore()
  //
  // doc.save()
  // doc.moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300')
  // doc.restore()
  //
  // doc.y = 300
  // doc.text(content, 50, 50)

  doc.end()
})

api.get('/read/:shortHash/:itemId', async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const shortHash = req.getParameter(0)
  const itemId = req.getParameter(1)

  const r: Req = readReq(shortHash)
  const item = r.idToItem[itemId]

  const task = getOrCreateTask(r, itemId)

  if (task.step === TaskStep.created) {
    log('notify receiver_ids')
    for (const workerId of r.workerIds) {
      log('send email')
      sendMail({
        sender: EMAIL_DEFAULT_SENDER,
        receiver: r.idToWorker[workerId],
        subject: email_notify_receiver_of_new_task_subject(),
        body: email_notify_receiver_of_new_task_body(
          item.title,
          item.subTitle,
          getFrontendActUrl(
            {
              action: Action.start,
              shortHash,
              itemId,
              taskId: task.id,
              workerId,
            },
            true
          ),
          getFrontendTaskUrl({ shortHash, itemId, taskId: task.id }, true)
        ),
      })
    }
  }

  task.notifiedAt = isoDatetimeFormatter(getDate())
  task.step = TaskStep.notified

  writeReq(shortHash, r)

  api.send(res, {
    [API_CODE.status]: API_CODE.OK,
    task: {
      step: task.step,
      id: task.id,
      createdAt: task.createdAt,
      notifiedAt: task.notifiedAt,
      startedAt: task.startedAt,
      doneAt: task.doneAt,
    },
  })
})

api.get('/task/:shortHash/:itemId/:taskId', async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const shortHash = req.getParameter(0)
  const itemId = req.getParameter(1)
  const taskId = req.getParameter(2)

  const r: Req = readReq(shortHash)
  const item = r.idToItem[itemId]
  const task = item.idToTask[taskId]

  api.send(res, {
    [API_CODE.status]: API_CODE.OK,
    task: {
      itemTitle: item.title,
      itemSubtitle: item.subTitle,
      step: task.step,
      id: task.id,
      createdAt: task.createdAt,
      notifiedAt: task.notifiedAt,
      startedAt: task.startedAt,
      doneAt: task.doneAt,
    },
  })
})

api.get(
  '/act/:action/:shortHash/:itemId/:taskId/:workerId',
  async (res, req) => {
    console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

    const action = req.getParameter(0)
    const shortHash = req.getParameter(1)
    const itemId = req.getParameter(2)
    const taskId = req.getParameter(3)
    const workerId = req.getParameter(4)

    const r: Req = readReq(shortHash)
    const item = r.idToItem[itemId]
    const task = item.idToTask[taskId]
    const email = r.idToWorker[workerId]

    if (action === 'start') {
      if (task.step === TaskStep.notified) {
        task.startedAt = isoDatetimeFormatter(getDate())
        task.step = TaskStep.inprogress
        task.workerId = workerId

        sendMail({
          sender: EMAIL_DEFAULT_SENDER,
          receiver: email,
          subject: email_notify_accept_task_subject(),
          body: email_notify_accept_task_body(
            item.title,
            item.subTitle,
            getFrontendActUrl(
              {
                action: Action.stop,
                shortHash,
                itemId,
                taskId: task.id,
                workerId,
              },
              true
            ),
            getFrontendTaskUrl({ shortHash, itemId, taskId: task.id }, true)
          ),
        })
      } else {
        return api.send(res, {
          [API_CODE.status]: API_CODE.ERROR,
          errors: [API_CODE.ERROR_ITEM_ALREADY_IN_PROGRESS],
        })
      }
    } else if (action === 'stop') {
      if (task.step === TaskStep.inprogress) {
        task.doneAt = isoDatetimeFormatter(getDate())
        task.step = TaskStep.done
        task.workerId = workerId

        sendMail({
          sender: EMAIL_DEFAULT_SENDER,
          receiver: email,
          subject: email_notify_done_task_subject(),
          body: email_notify_done_task_body(
            item.title,
            item.subTitle,
            getFrontendTaskUrl({ shortHash, itemId, taskId: task.id }, true)
          ),
        })
      } else {
        return api.send(res, {
          [API_CODE.status]: API_CODE.ERROR,
          errors: [API_CODE.ERROR_ITEM_ALREADY_DONE],
        })
      }
    } else {
      // TODO
    }

    writeReq(shortHash, r)

    return api.send(res, {
      [API_CODE.status]: API_CODE.OK,
      task: {
        step: task.step,
        id: task.id,
        createdAt: task.createdAt,
        notifiedAt: task.notifiedAt,
        startedAt: task.startedAt,
        doneAt: task.doneAt,
        workerId: task.workerId,
      },
    })
  }
)

api.get('/optout/:shortHash/:workerId', async (res, req) => {
  console.log(`${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)

  const shortHash = req.getParameter(0)
  const workerId = req.getParameter(1)

  const r: Req = readReq(shortHash)

  try {
    const { [workerId]: tbd, ...newIdToWorker } = r.idToWorker
    const newWorkerIds = []
    const newIdToToWorker: { [key: string]: string } = {}
    for (const i of r.workerIds) {
      if (i === workerId) continue
      newWorkerIds.push(i)
      newIdToToWorker[i] = r.idToWorker[i]
    }

    r.idToWorker = newIdToWorker
    r.workerIds = newWorkerIds
  } catch (e) {}

  writeReq(shortHash, r)

  return api.send(res, {
    [API_CODE.status]: API_CODE.OK,
  })
})

api.get('/*', async (res, req) => {
  return api.send(res, {
    [API_CODE.status]: API_CODE.ERROR,
    [API_CODE.errors]: [API_CODE.ERROR_NOT_FOUND],
  })
})

// api.get('/*', async (res, req) => {
//   console.log(`/* ${req.getMethod()}: ${req.getUrl()} ${req.getQuery()}`)
//   const url = req.getUrl()
//
//   if (url === '/') {
//     res.writeHeader('Content-Type', 'text/html')
//     return api.sendFile(res, 'index.html')
//   }
//
//   // if (filePath === 'favicon.ico') {
//   //   res.writeStatus('404')
//   //   return api.sendRaw(res)
//   // }
//   try {
//     const filePath = url.slice(1, url.length)
//     res.writeHeader('Cache-Control', 'max-age=31536000')
//
//     const fileExtension = getFileExtension(filePath)
//     if (fileExtension === 'svg') {
//       res.writeHeader('Content-Type', 'image/svg+xml')
//     }
//     return api.sendFile(res, filePath)
//   } catch (e) {
//     console.log(`could not find ${url}, returning index.html`)
//     res.writeHeader('Content-Type', 'text/html')
//     return api.sendFile(res, 'index.html')
//   }
// })

api.listen()

deleteOldReqs()
