import { ActRouteInfo } from '@hekori/traqrcode-common'

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

export const editRoute = ({ pageUuid }: EditRouteInfo) => {
  return `/edit/${pageUuid}`
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

export const viewRegex = (pathname: string): AdminRouteInfo | null => {
  const pattern = /\/view\/(?<shortHash>.*)\/(?<accessToken>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      shortHash: groups.shortHash,
      accessToken: groups.accessToken,
    }
  }
  return null
}
export type ReadRouteInfo = {
  shortHash: string
  itemId: string
}

export const readRoute = ({ shortHash, itemId }: ReadRouteInfo) => {
  return `/read/${shortHash}/${itemId}`
}

export const readRegex = (pathname: string): ReadRouteInfo | null => {
  const pattern = /\/read\/(?<shortHash>.*)\/(?<itemId>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return { shortHash: groups.shortHash, itemId: groups.itemId }
  }
  return null
}
export type TaskRouteInfo = {
  shortHash: string
  itemId: string
  taskId: string
}

export const taskRoute = ({ shortHash, itemId, taskId }: TaskRouteInfo) => {
  return `/task/${shortHash}/${itemId}/${taskId}`
}

export const taskRegex = (pathname: string): TaskRouteInfo | null => {
  const pattern = /\/task\/(?<shortHash>.*)\/(?<itemId>.*)\/(?<taskId>.*)/
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      shortHash: groups.shortHash,
      itemId: groups.itemId,
      taskId: groups.taskId,
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
  shortHash,
  itemId,
  taskId,
  workerId,
}: ActRouteInfo) => {
  return `/act/${action}/${shortHash}/${itemId}/${taskId}/${workerId}`
}

export const actRegex = (pathname: string): ActRouteInfo | null => {
  const pattern = /\/act\/(?<action>.*)\/(?<shortHash>.*)\/(?<itemId>.*)\/(?<taskId>.*)\/(?<workerId>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      action: groups.action as Action,
      shortHash: groups.shortHash,
      itemId: groups.itemId,
      taskId: groups.taskId,
      workerId: groups.workerId,
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
