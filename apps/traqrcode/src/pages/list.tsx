import * as React from 'react'
import { ContextState } from '../index.provider'
import { Container } from '../components/Container'
import { ShellPublic } from '../components/ShellPublic'
import { ListRouteInfo } from '../routings'

interface PropsPageList {
  routeInfo: ListRouteInfo
}
export const PageList: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { state, setState } = React.useContext(ContextState)

  return (
    <ShellPublic>
      <Container></Container>
    </ShellPublic>
  )
}
