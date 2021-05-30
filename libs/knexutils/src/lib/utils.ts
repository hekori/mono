import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')
import utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const printPostgresEnvVars = () => {
  console.log('process.env.PGUSER=', process.env.PGUSER)
  console.log('process.env.PGHOST=', process.env.PGHOST)
  console.log('process.env.PGDATABASE=', process.env.PGDATABASE)
  console.log('process.env.PGPASSWORD=****')
  console.log('process.env.PGPORT=', process.env.PGPORT)
}
export const formatFileSystemSaveISO = (date: string | Date | Dayjs) => {
  return dayjs(date, { utc: true }).utc().format('YYYY-MM-DDTHH-mm-ss[Z]')
}
