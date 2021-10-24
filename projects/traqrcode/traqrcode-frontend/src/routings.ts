import { ActRouteInfo, PageItemProgress } from '@hekori/traqrcode-common'

export const FRONTPAGE_ROUTE = '/frontpage'
export const PRICING_ROUTE = '/pricing'
export const TERMS_ROUTE = '/terms'
export const IMPRINT_ROUTE = '/imprint'
export const PRIVACY_ROUTE = '/privacy'
export const HOMEPAGE_ROUTE = '/'
export const SIGNUP_ROUTE = '/signup'
export const CREATE_QR_ROUTE = '/create-qr'
export const DASHBOARD_ROUTE = '/dashboard'
export const PDF_ROUTE = '/pdf'

export type AdminRouteInfo = {
  shortHash: string
  accessToken: string
}
export type CheckLoginRouteInfo = {
  accessToken: string
}

export type DashboardRouteInfo = Record<string, never>
export type PdfRouteInfo = Record<string, never>

export const loginRegex = (pathname: string): CheckLoginRouteInfo | null => {
  const pattern = /\/login\/(?<accessToken>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      accessToken: groups.accessToken,
    }
  }
  return null
}

export const dashboardRegex = (pathname: string): DashboardRouteInfo | null => {
  if (pathname.startsWith(DASHBOARD_ROUTE)) {
    return {}
  } else return null
}

export const pdfRegex = (pathname: string): PdfRouteInfo | null => {
  if (pathname.startsWith(PDF_ROUTE)) {
    return {}
  } else return null
}

export type EditRouteInfo = {
  pageUuid: string
}

export type ViewRouteInfo = {
  pageUuid: string
}

export type DetailsRouteInfo = Record<string, unknown>

export const editRoute = ({ pageUuid }: EditRouteInfo) => {
  return `/edit/${pageUuid}`
}

export const detailsRoute = () => {
  return `/progress`
}

export const detailsRegex = (pathname: string): DetailsRouteInfo | null => {
  if (pathname.startsWith('/progress')) {
    return {}
  } else return null
}

export const editRegex = (pathname: string): EditRouteInfo | null => {
  const pattern = /\/edit\/(?<pageUuid>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      pageUuid: groups.pageUuid,
    }
  }
  return null
}

export const viewRoute = ({ shortHash, accessToken }: AdminRouteInfo) => {
  return `/view/${shortHash}/${accessToken}`
}

export const viewRegex = (pathname: string): ViewRouteInfo | null => {
  const pattern = /\/view\/(?<pageUuid>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      pageUuid: groups.pageUuid,
    }
  }
  return null
}
export type ReadRouteInfo = {
  pageItemUuid: string
}

export const readRoute = ({ pageItemUuid }: ReadRouteInfo) => {
  return `/read/${pageItemUuid}`
}

export const readRegex = (pathname: string): ReadRouteInfo | null => {
  const pattern = /\/read\/(?<pageItemUuid>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return { pageItemUuid: groups.pageItemUuid }
  }
  return null
}
export type TaskRouteInfo = Pick<PageItemProgress, 'pageItemProgressUuid'>

export const taskRoute = ({ pageItemProgressUuid }: TaskRouteInfo) => {
  return `/task/${pageItemProgressUuid}`
}

export const taskRegex = (pathname: string): TaskRouteInfo | null => {
  const pattern = /\/task\/(?<pageItemProgressUuid>.*)/
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      pageItemProgressUuid: groups.pageItemProgressUuid,
    }
  }
  return null
}

export enum Action {
  start = 'start',
  cancel = 'cancel',
  stop = 'stop',
}

export const actRoute = ({
  action,
  pageItemProgressUuid,
  userUuid,
}: ActRouteInfo) => {
  return `/act/${action}/${pageItemProgressUuid}/${userUuid}`
}

export const actRegex = (pathname: string): ActRouteInfo | null => {
  const pattern = /\/act\/(?<action>.*)\/(?<pageItemProgressUuid>.*)\/(?<pageWorkerUuid>.*)/
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      action: groups.action as Action,
      pageItemProgressUuid: groups.pageItemProgressUuid,
      userUuid: groups.userUuid,
    }
  }
  return null
}
