import { BACKEND_URL, FRONTEND_URL } from './settings'

export enum Action {
  start = 'start',
  cancel = 'cancel',
  stop = 'stop',
}

export interface ActRouteInfo {
  action: Action
  pageItemProgressUuid: string
  pageWorkerUuid: string
}

// FIXME: there should be only one interface
export interface TaskRouteInfo {
  pageItemProgressUuid: string
}

export interface ReadRouteInfo {
  pageItemUuid: string
}

export interface EditRouteInfo {
  shortHash: string
  accessToken: string
}

export interface PdfRouteInfo {
  shortHash: string
}

export interface EditRouteInfo {
  shortHash: string
}

export const getFrontendEditUrl = (
  routeInfo: EditRouteInfo,
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? FRONTEND_URL : ''}/edit/${routeInfo.shortHash}/${
    routeInfo.accessToken
  }`
}

export const getFrontendReadUrl = (
  routeInfo: ReadRouteInfo,
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? FRONTEND_URL : ''}/read/${routeInfo.pageItemUuid}`
}

export const getFrontendPageItemProgressUrl = (
  routeInfo: TaskRouteInfo,
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? FRONTEND_URL : ''}/task/${
    routeInfo.pageItemProgressUuid
  }`
}

export const getFrontendActUrl = (
  routeInfo: ActRouteInfo,
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? FRONTEND_URL : ''}/act/${routeInfo.action}/${
    routeInfo.pageItemProgressUuid
  }/${routeInfo.pageWorkerUuid}`
}

export const getBackendPdfUrl = (
  routeInfo: PdfRouteInfo,
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/pdf/${routeInfo.shortHash}`
}

export const getBackendListGetUrl = (addBaseUrl = false): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/list`
}

export const getBackendCreatePagePostUrl = (addBaseUrl = false): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/create`
}

export const getBackendEditPagePostUrl = (
  pageUuid: string = '',
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/edit/${pageUuid}`
}

export const getBackendEditPageGetUrl = (
  pageUuid: string = '',
  addBaseUrl = false
): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/edit/${pageUuid}`
}

export const getBackendPageDeleteUrl = ({
  addBaseUrl = false,
  pageUuid,
}: {
  addBaseUrl?: boolean
  pageUuid?: string
}): string => {
  const retval = `${addBaseUrl ? BACKEND_URL : ''}/page/:pageUuid`
  if (pageUuid) return retval.replace(':pageUuid', pageUuid)
  return retval
}

export const getBackendLoginPostUrl = (addBaseUrl = false): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/login`
}

export const getBackendSignupPostUrl = (addBaseUrl = false): string => {
  return `${addBaseUrl ? BACKEND_URL : ''}/signup`
}
