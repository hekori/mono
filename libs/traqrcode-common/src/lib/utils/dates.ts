import { Moment } from 'moment'
import * as moment from 'moment'

export const MOMENTJS_DATE_FORMAT = 'YYYY-MM-DD'
export const MOMENTJS_DATETIME_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[Z]'

export const MOMENTJS_FILESYSTEM_DATE_FORMAT = 'YYYYMMDD'

export const MOMENTJS_FILESYSTEM_DATETIME_FORMAT = 'YYYYMMDD[T]HHmmss[Z]'

export const getLocale = () => {
  if (window.navigator.languages) {
    return window.navigator.languages[0]
  } else {
    return window.navigator.language
  }
}

export type MyDate = Date | string | Moment

export const getDate = (date?: MyDate): Moment => {
  return moment(date)
}

// dateFormatter('2020-10-21', 'en'): "10/21/2020"
// dateFormatter('2020-10-21', 'de'): "21.10.2020"
export const dateFormatter = (date: MyDate, locale = getLocale()): string =>
  moment(date).locale(locale).format('L')

// timeFormatter('2020-10-21T13:51:34', 'en'): "1:51 PM"
// timeFormatter('2020-10-21T13:51:34', 'de'): "13:51"
export const timeFormatter = (date: MyDate, locale = getLocale()): string =>
  moment(date).locale(locale).format('LT')

// isoDatetimeFormatter(new Date()): "2020-10-20T23:54:37Z"
export const isoDatetimeFormatter = (date: MyDate): string =>
  moment(date).utc().format(MOMENTJS_DATETIME_FORMAT)

// isoDateFilesystemFormatter(new Date()): "20201020"
export const isoDateFilesystemFormatter = (date: MyDate): string => {
  return moment(date).utc().format(MOMENTJS_FILESYSTEM_DATE_FORMAT)
}

// isoDatetimeFilesystemFormatter(new Date()): "20201020T235437Z"
export const isoDatetimeFilesystemFormatter = (date: MyDate): string => {
  return moment(date).utc().format(MOMENTJS_FILESYSTEM_DATETIME_FORMAT)
}

// isoDateFormatter(new Date()): "2020-10-20"
export const isoDateFormatter = (date: MyDate): string =>
  moment(date).utc().format(MOMENTJS_DATE_FORMAT)

// dayNameFormatter(new Date(), 'de'): "Dienstag"
export const dayNameFormatter = (
  date: MyDate,
  locale: string = getLocale()
): string => moment(date).locale(locale).format('dddd')

// shortDayNameFormatter(new Date(), 'de'): "Di."
export const shortDayNameFormatter = (
  date: MyDate,
  locale: string = getLocale()
): string => moment(date).locale(locale).format('ddd')

export const millisSinceStartOfDay = (date: MyDate): number => {
  return moment(date).diff(moment.utc(isoDateFormatter(date)), 'milliseconds')
}
