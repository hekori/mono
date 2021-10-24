import {
  API_CODE,
  FRONTEND_URL,
  getFrontendReadUrl,
  Page,
  PageItem,
  PostResponseError,
  to,
} from '@hekori/traqrcode-common'
import { pg } from '../../pg'
import * as QRCode from 'qrcode'
import pdfkit = require('pdfkit')

export const getPdf = async (request, reply) => {
  console.log('called getPdf')

  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.headers?.authorization)

  const page: Page = await pg('page')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')
    .first()

  if (!page) {
    const responseData: PostResponseError = {
      status: API_CODE.ERROR,
      errors: [API_CODE.ERROR_NOT_FOUND],
    }
    return reply.status(404).send(responseData)
  }

  const pageItems: PageItem[] = await pg('pageItem')
    .where({ pageUuid: request.params.pageUuid })
    .orderBy('createdAt', 'ASC')

  const doc = new pdfkit({ autoFirstPage: false, bufferPages: true })

  // write pdf to buffer
  const buffers: any[] = []
  doc.on('data', buffers.push.bind(buffers))
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers)
    reply.code(200).header('Content-Type', 'application/pdf').send(pdfData)
  })

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

  if (pageItems.length === 0) {
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

  for (let i = 0; i < pageItems.length; i++) {
    const pageItem = pageItems[i]

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
    doc.text(pageItem.title, PAGE_MARGIN + mm(6), yoffset + mm(6))
    doc.fontSize(18)
    doc.text(pageItem.subTitle, PAGE_MARGIN + mm(6), yoffset + mm(18), {
      width: PAGE_WIDTH - 2 * PAGE_MARGIN - 2 * QR_X - 2 * mm(6),
    })
    doc.restore()
    doc.save()
    doc.fontSize(9)
    doc.text(
      getFrontendReadUrl({ pageItemUuid: pageItem.pageItemUuid }, true),
      PAGE_MARGIN + mm(6),
      yoffset + mm(34)
    )
    doc.restore()

    const [err, dataUrl] = await to(
      QRCode.toDataURL(
        getFrontendReadUrl({ pageItemUuid: pageItem.pageItemUuid }, true)
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

  doc.end()
}
