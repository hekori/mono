import { useLocation } from 'react-router-dom'
import { PageFront } from './pages/PageFrontpage'
import { PageEdit } from './pages/PageEdit'
import { PageError404 } from './pages/PageError404'
import * as React from 'react'
import { PageView } from './pages/PageView'
import { PageTask } from './pages/PageTask'
import { PageImprint } from './pages/PageImprint'
import { PagePrivacy } from './pages/PagePrivacy'
import { PageTerms } from './pages/PageTerms'
import { PageAction } from './pages/PageAct'
import { PageRead } from './pages/PageRead'
import { PageSignup } from './pages/PageSignup'
import { ActRouteInfo } from '@hekori/traqrcode-common'
import { PagePricing } from './pages/PagePricing'
import { PageCheckLogin } from './pages/PageCheckLogin'
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
  const actRouteInfo: ActRouteInfo | null = actRegex(location.pathname)
  if (actRouteInfo) return <PageAction routeInfo={actRouteInfo} />

  // default
  return <PageError404 />
}
