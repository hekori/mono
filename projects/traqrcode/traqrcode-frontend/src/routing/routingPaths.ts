import { ActRouteInfo } from '@hekori/traqrcode-common'
import {
  EditRouteInfo,
  ReadRouteInfo,
  RoutingTypes,
  TaskRouteInfo,
} from './routingTypes'

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
export const OIDC_LOGIN_ROUTE = '/oidc-login'

export const editRoute = ({ pageUuid }: EditRouteInfo) => {
  return `/edit/${pageUuid}`
}

export const detailsRoute = () => {
  return `/progress`
}

export const viewRoute = ({ shortHash, accessToken }: RoutingTypes) => {
  return `/view/${shortHash}/${accessToken}`
}

export const readRoute = ({ pageItemUuid }: ReadRouteInfo) => {
  return `/read/${pageItemUuid}`
}

export const taskRoute = ({ pageItemProgressUuid }: TaskRouteInfo) => {
  return `/task/${pageItemProgressUuid}`
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
