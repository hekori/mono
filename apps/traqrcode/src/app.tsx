import { useLocation } from 'react-router-dom'
import { PageFront } from './pages/frontpage'
import { PageEdit } from './pages/edit'
import { PageError404 } from './pages/error404'
import * as React from 'react'
import { PageView } from './pages/view'
import { PageTask } from './pages/task'
import { PageImprint } from './pages/imprint'
import { PagePrivacy } from './pages/privacy'
import { PageTerms } from './pages/terms'
import { PageAction } from './pages/act'
import { PageRead } from './pages/read'
import { PageSignup } from './pages/signup'
import { ActRouteInfo } from '@hekori/traqrcode-common'
import { PagePricing } from './pages/pricing'
import { PageCheckLogin } from './pages/checklogin'
import { PageList } from './pages/PageList'
import {
  actRegex,
  CheckLoginRouteInfo,
  editRegex,
  EditRouteInfo,
  IMPRINT_ROUTE,
  listRegex,
  ListRouteInfo,
  loginRegex,
  PRICING_ROUTE,
  PRIVACY_ROUTE,
  readRegex,
  ReadRouteInfo,
  SIGNUP_ROUTE,
  taskRegex,
  TaskRouteInfo,
  TERMS_ROUTE,
  viewRegex,
  ViewRouteInfo,
} from './routings'

export const App = () => {
  const location = useLocation()

  // page front
  if (location.pathname === '/') return <PageFront />

  // imprint
  if (location.pathname === IMPRINT_ROUTE) return <PageImprint />

  // pricing
  if (location.pathname === PRICING_ROUTE) return <PagePricing />

  // privacy
  if (location.pathname === PRIVACY_ROUTE) return <PagePrivacy />

  // terms
  if (location.pathname === TERMS_ROUTE) return <PageTerms />

  // page create
  if (location.pathname === SIGNUP_ROUTE) return <PageSignup />

  // page login
  const loginRouteInfo: CheckLoginRouteInfo | null = loginRegex(
    location.pathname
  )
  if (loginRouteInfo) return <PageCheckLogin routeInfo={loginRouteInfo} />

  // page list
  const listRouteInfo: ListRouteInfo | null = listRegex(location.pathname)
  if (listRouteInfo) return <PageList routeInfo={listRouteInfo} />

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
  const actionRouteInfo: ActRouteInfo | null = actRegex(location.pathname)
  if (actionRouteInfo) return <PageAction routeInfo={actionRouteInfo} />

  // default
  return <PageError404 />
}
