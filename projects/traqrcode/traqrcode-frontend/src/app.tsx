import { useHistory, useLocation } from 'react-router-dom'
import { PageFront } from './pages/PageFrontpage'
import { PageEdit } from './pages/PageEdit'
import { PageError404 } from './pages/PageError404'
import * as React from 'react'
import { PageView } from './pages/PageView'
import { PageProgress } from './pages/PageProgress'
import { PageImprint } from './pages/PageImprint'
import { PagePrivacy } from './pages/PagePrivacy'
import { PageTerms } from './pages/PageTerms'
import { PageAction } from './pages/PageAct'
import { PageRead } from './pages/PageRead'
import { PageSignup } from './pages/PageSignup'
import { ActRouteInfo } from '@hekori/traqrcode-common'
import { PagePricing } from './pages/PagePricing'
import { PageOidcLoginCallback } from './pages/PageOidcLoginCallback'
import { PagePdfs } from './pages/PagePdfs'
import {
  CREATE_QR_ROUTE, OIDC_LOGIN_ROUTE,
  FRONTPAGE_ROUTE,
  IMPRINT_ROUTE,
  PDF_ROUTE,
  PRICING_ROUTE,
  PRIVACY_ROUTE,
  SIGNUP_ROUTE,
  TERMS_ROUTE,
} from './routing/routingPaths'
import { PageDashboard } from './pages/PageDashboard'
import { isLoggedIn } from './utils/utilsUserLoggedIn'
import { PageTask } from './pages/PageTask'
import {
  OidcLoginCallbackRouteInfo,
  DashboardRouteInfo,
  DetailsRouteInfo,
  EditRouteInfo,
  PdfRouteInfo,
  ReadRouteInfo,
  TaskRouteInfo,
  ViewRouteInfo,
} from './routing/routingTypes'
import {
  actRegex,
  dashboardRegex,
  detailsRegex,
  editRegex,
  pdfRegex,
  readRegex,
  oidcLoginCallbackRegex,
  taskRegex,
  viewRegex,
} from './routing/oidcLoginCallbackRegex'
import {PageOidcLogin} from "./pages/PageOidcLogin";

export const App = () => {
  const location = useLocation()
  const history = useHistory()

  if (location.pathname === '/') {
    if (isLoggedIn()) history.push(PDF_ROUTE)
    else history.push(FRONTPAGE_ROUTE)
  }

  // page front
  if (location.pathname === FRONTPAGE_ROUTE) return <PageFront />

  // imprint
  if (location.pathname === IMPRINT_ROUTE) return <PageImprint />

  // pricing
  if (location.pathname === PRICING_ROUTE) return <PagePricing />

  // privacy
  if (location.pathname === PRIVACY_ROUTE) return <PagePrivacy />

  // terms
  if (location.pathname === TERMS_ROUTE) return <PageTerms />

  // page signup
  if (location.pathname === SIGNUP_ROUTE)
    return <PageSignup variant={'signup'} />

  // page create
  if (location.pathname === CREATE_QR_ROUTE)
    return <PageSignup variant={'createQr'} />

  // page OIDC login
  if (location.pathname === OIDC_LOGIN_ROUTE)
    return <PageOidcLogin />

  // page login from url
  const oidcLoginCallbackRouteInfo: OidcLoginCallbackRouteInfo | null = oidcLoginCallbackRegex(
    location.pathname
  )
  if (oidcLoginCallbackRouteInfo) return <PageOidcLoginCallback routeInfo={oidcLoginCallbackRouteInfo} />

  // page dashboard
  const dashboardRouteInfo: DashboardRouteInfo | null = dashboardRegex(
    location.pathname
  )
  // eslint-disable-next-line react/jsx-no-undef
  if (dashboardRouteInfo)
    return <PageDashboard routeInfo={dashboardRouteInfo} />

  // page list
  const listRouteInfo: PdfRouteInfo | null = pdfRegex(location.pathname)
  if (listRouteInfo) return <PagePdfs routeInfo={listRouteInfo} />

  // page details
  const detailsRouteInfo: DetailsRouteInfo | null = detailsRegex(
    location.pathname
  )
  if (detailsRouteInfo) return <PageProgress routeInfo={detailsRouteInfo} />

  // page edit
  const editRouteInfo: EditRouteInfo | null = editRegex(location.pathname)
  if (editRouteInfo) return <PageEdit routeInfo={editRouteInfo} />

  // page view
  const viewRouteInfo: ViewRouteInfo | null = viewRegex(location.pathname)
  if (viewRouteInfo) return <PageView routeInfo={viewRouteInfo} />

  // page read
  const readRouteInfo: ReadRouteInfo | null = readRegex(location.pathname)
  if (readRouteInfo) return <PageRead routeInfo={readRouteInfo} />

  // page task
  const taskRouteInfo: TaskRouteInfo | null = taskRegex(location.pathname)
  if (taskRouteInfo) return <PageTask routeInfo={taskRouteInfo} />

  // page action
  const actRouteInfo: ActRouteInfo | null = actRegex(location.pathname)
  if (actRouteInfo) return <PageAction routeInfo={actRouteInfo} />

  // default
  return <PageError404 />
}
