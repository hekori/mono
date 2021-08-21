import { ActRouteInfo, PageItemProgress } from '@hekori/traqrcode-common'

export type AdminRouteInfo = {
  shortHash: string
  accessToken: string
}
export type CheckLoginRouteInfo = {
  accessToken: string
}
export type ListRouteInfo = Record<string, never>

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

export const listRoute = () => {
  return `/list`
}

export const listRegex = (pathname: string): ListRouteInfo | null => {
  if (pathname.startsWith('/list')) {
    return {}
  } else return null
}

export type EditRouteInfo = {
  pageUuid: string
}

export type ViewRouteInfo = {
  pageUuid: string
}

export type DetailsRouteInfo = {}

export const editRoute = ({ pageUuid }: EditRouteInfo) => {
  return `/edit/${pageUuid}`
}

export const detailsRoute = () => {
  return `/details`
}

export const detailsRegex = (pathname: string): DetailsRouteInfo | null => {
  if (pathname.startsWith('/details')) {
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
  pageWorkerUuid,
}: ActRouteInfo) => {
  return `/act/${action}/${pageItemProgressUuid}/${pageWorkerUuid}`
}

export const actRegex = (pathname: string): ActRouteInfo | null => {
  const pattern = /\/act\/(?<action>.*)\/(?<pageItemProgressUuid>.*)\/(?<pageWorkerUuid>.*)/
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      action: groups.action as Action,
      pageItemProgressUuid: groups.pageItemProgressUuid,
      pageWorkerUuid: groups.pageWorkerUuid,
    }
  }
  return null
}

export const PRICING_ROUTE = '/pricing'
export const TERMS_ROUTE = '/terms'
export const IMPRINT_ROUTE = '/imprint'
export const PRIVACY_ROUTE = '/privacy'
export const HOMEPAGE_ROUTE = '/'
export const SIGNUP_ROUTE = '/signup'
