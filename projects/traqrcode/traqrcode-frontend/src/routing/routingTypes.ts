import { PageItemProgress } from '@hekori/traqrcode-common'

export type RoutingTypes = {
  shortHash: string
  accessToken: string
}
export type OidcLoginCallbackRouteInfo = {
  idToken: string
}
export type DashboardRouteInfo = Record<string, never>
export type PdfRouteInfo = Record<string, never>
export type EditRouteInfo = {
  pageUuid: string
}
export type ViewRouteInfo = {
  pageUuid: string
}
export type DetailsRouteInfo = Record<string, unknown>
export type ReadRouteInfo = {
  pageItemUuid: string
}
export type TaskRouteInfo = Pick<PageItemProgress, 'pageItemProgressUuid'>
