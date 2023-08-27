import { ActRouteInfo } from '@hekori/traqrcode-common'
import {
  OidcLoginCallbackRouteInfo,
  DashboardRouteInfo,
  DetailsRouteInfo,
  EditRouteInfo,
  PdfRouteInfo,
  ReadRouteInfo,
  TaskRouteInfo,
  ViewRouteInfo,
} from './routingTypes'
import { Action, DASHBOARD_ROUTE, PDF_ROUTE } from './routingPaths'

export const oidcLoginCallbackRegex = (pathname: string): OidcLoginCallbackRouteInfo | null => {
  const pattern = /\/oidc-login\/callback\/(?<idToken>.*)/
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return {
      idToken: groups.idToken
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
export const readRegex = (pathname: string): ReadRouteInfo | null => {
  const pattern = /\/read\/(?<pageItemUuid>.*)/
  // console.log(pathname.match(pattern));
  const groups = pathname.match(pattern)?.groups
  if (groups) {
    return { pageItemUuid: groups.pageItemUuid }
  }
  return null
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
export const actRegex = (pathname: string): ActRouteInfo | null => {
  const pattern = /\/act\/(?<action>.*)\/(?<pageItemProgressUuid>.*)\/(?<userUuid>.*)/
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
