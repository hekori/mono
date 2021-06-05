import { useLocation } from 'react-router-dom'
import { PageFront } from './pages/frontpage'
import { PageSetup } from './pages/edit'
import { PageError404 } from './pages/error404'
import * as React from 'react'
import { PageView } from './pages/view'
import { PageTask } from './pages/task'
import { PageImprint } from './pages/imprint'
import { PagePrivacy } from './pages/privacy'
import { PageTerms } from './pages/terms'
import { PageAction } from './pages/act'
import { PageRead } from './pages/read'
import { PageCreate } from './pages/create'
import { ActRouteInfo } from '../../traqrcode-common/src/urls'
import { PagePricing } from './pages/pricing'

export type AdminRouteInfo = {
  shortHash: string
  accessToken: string
}

const editRegex = (pathname: string): AdminRouteInfo | null => {
  const pattern = /\/edit\/(?<shortHash>.*)\/(?<accessToken>.*)/
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

const viewRegex = (pathname: string): AdminRouteInfo | null => {
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

const readRegex = (pathname: string): ReadRouteInfo | null => {
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

const taskRegex = (pathname: string): TaskRouteInfo | null => {
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

const actRegex = (pathname: string): ActRouteInfo | null => {
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

export const App = () => {
  const location = useLocation()

  // page front
  if (location.pathname === '/') return <PageFront />

  // imprint
  if (location.pathname === '/imprint') return <PageImprint />

  // pricing
  if (location.pathname === '/pricing') return <PagePricing />

  // privacy
  if (location.pathname === '/privacy') return <PagePrivacy />

  // terms
  if (location.pathname === '/terms') return <PageTerms />

  // page create
  if (location.pathname === '/create') return <PageCreate />

  // page edit
  const editRouteInfo: AdminRouteInfo | null = editRegex(location.pathname)
  if (editRouteInfo) return <PageSetup routeInfo={editRouteInfo} />

  // page view
  const viewRouteInfo: AdminRouteInfo | null = viewRegex(location.pathname)
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
