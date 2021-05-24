import {
  getDate,
  isoDateFilesystemFormatter,
  isoDatetimeFilesystemFormatter,
  isoDatetimeFormatter,
  millisSinceStartOfDay,
  MOMENTJS_FILESYSTEM_DATE_FORMAT,
  MyDate,
} from '../../common/src/utils/dates'
import { shortuuid, uuid } from '../../common/src/utils/misc'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
} from 'fs'

const writeFileAtomicSync = require('write-file-atomic').sync

import { Req, Task, TaskStep } from '../../common/src/interfaces/models'
import path = require('path')
import moment = require('moment')
import { STORE_DIR } from './settings'

export const createShortHash = () => {
  const now = getDate()
  const t = millisSinceStartOfDay(now).toString(16)
  const h = '0'.repeat(8 - t.length) + t + '-' + shortuuid()
  return isoDateFilesystemFormatter(now) + '_' + h
}

export const createHash = () => {
  return uuid()
}

export const getReqFilePath = (shortHash: string) => {
  const [folder, file] = shortHash.split('_')
  return path.join(STORE_DIR, folder, `${file}.json`)
}

export const writeReq = (shortHash: string, data: Req) => {
  const [folder, file] = shortHash.split('_')
  mkdirSync(path.join(STORE_DIR, folder), { recursive: true })
  writeFileAtomicSync(
    path.join(STORE_DIR, folder, `${file}.json`),
    JSON.stringify(data, null, 2),
  )
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
        path.join(STORE_DIR, dir, o),
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
