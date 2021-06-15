import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
} from 'fs'
import { FRONTEND_URL, JWT_PRIVATE_KEY, STORE_DIR } from './settings'
import path = require('path')
import moment = require('moment')
import { Req, Task, TaskStep, to } from '@hekori/traqrcode-common'
import {
  getDate,
  isoDateFilesystemFormatter,
  isoDatetimeFilesystemFormatter,
  isoDatetimeFormatter,
  millisSinceStartOfDay,
  MOMENTJS_FILESYSTEM_DATE_FORMAT,
  MyDate,
} from '@hekori/dates'
import { shortuuid, getUuid } from '@hekori/traqrcode-common'

import { sync as writeFileAtomicSync } from 'write-file-atomic'
import { pg } from '../pg'
import jwt = require('jsonwebtoken')

export const createAccessToken = (
  {
    userUuid,
  }: {
    userUuid: string
  },
  privateKey = JWT_PRIVATE_KEY
): string => {
  return jwt.sign({ userUuid }, privateKey, {
    expiresIn: 90 * 24 * 60 * 60,
  })
}

export const verifyAccessToken = (
  accessToken: string,
  privateKey = JWT_PRIVATE_KEY
): { userUuid: string } | undefined => {
  try {
    const s = jwt.verify(accessToken, privateKey)
    console.log(s)
    return s
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const getLoginUrlForAccessToken = (accessToken: string): string => {
  return `${FRONTEND_URL}/login/${accessToken}`
}

export const createShortHash = () => {
  const now = getDate()
  const t = millisSinceStartOfDay(now).toString(16)
  const h = '0'.repeat(8 - t.length) + t + '-' + shortuuid()
  return isoDateFilesystemFormatter(now) + '_' + h
}

export const createHash = () => {
  return getUuid()
}

export const getReqFilePath = (shortHash: string) => {
  const [folder, file] = shortHash.split('_')
  return path.join(STORE_DIR, folder, `${file}.json`)
}

export const writeReq = async (shortHash: string, data: Req) => {
  const [folder, file] = shortHash.split('_')
  mkdirSync(path.join(STORE_DIR, folder), { recursive: true })
  writeFileAtomicSync(
    path.join(STORE_DIR, folder, `${file}.json`),
    JSON.stringify(data, null, 2)
  )

  console.log('start transaction')
  const trx = await pg.transaction()
  try {
    await pg('user').insert({ email: data.admin })
    await trx.commit()
    console.log('end transaction')
  } catch (e) {
    await trx.rollback(e)
    console.error(e)
  }
}

export const readReq = (shortHash: string): Req => {
  const p = getReqFilePath(shortHash)
  return JSON.parse(readFileSync(p, { encoding: 'utf-8' }))
}

export const removeReq = (shortHash: string): void => {
  const p = getReqFilePath(shortHash)
  unlinkSync(p)
}

export const existsReq = (shortHash: string): boolean => {
  const p = getReqFilePath(shortHash)
  return existsSync(p)
}

export const getUnusedShortHash = (): string => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const shortHash = createShortHash()
    if (!existsSync(getReqFilePath(shortHash))) return shortHash
  }
}

export const getReqPathsWithinRange = (startDate: MyDate, endDate: MyDate) => {
  const list = readdirSync(STORE_DIR)
  const start = moment(startDate)
  const end = moment(endDate)

  let retval: string[] = []
  for (const dir of list) {
    const d = moment(dir, MOMENTJS_FILESYSTEM_DATE_FORMAT)
    if (start <= d && d <= end) {
      const list2 = readdirSync(path.join(STORE_DIR, dir)).map((o) =>
        path.join(STORE_DIR, dir, o)
      )
      retval = retval.concat(list2)
    }
  }
  return retval
}

export const readSync = (p: string) => {
  return readFileSync(p, { encoding: 'utf-8' })
}

export const writeSync = (p: string, data: string) => {
  const folder = path.dirname(p)
  mkdirSync(path.join(STORE_DIR, folder), { recursive: true })
  return writeFileAtomicSync(p, data)
}

export const removeSync = (p: string) => {
  return unlinkSync(p)
}

export const getOrCreateTask = (req: Req, itemId: string): Task => {
  const now = getDate()
  const taskId = isoDatetimeFilesystemFormatter(now)
  const createdAt = isoDatetimeFormatter(now)
  const item = req.idToItem[itemId]
  const taskIds = item.taskIds
  const idToTask = item.idToTask
  if (
    taskIds.length == 0 ||
    idToTask[taskIds[taskIds.length - 1]].step === TaskStep.done
  ) {
    idToTask[taskId] = { id: taskId, createdAt, step: TaskStep.created }
    taskIds.push(taskId)
  }
  return idToTask[taskIds[taskIds.length - 1]]
}
