import * as React from 'react'
import { GlobalContext, useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { ShellPublic } from '../components/ShellPublic'
import { ListRouteInfo } from '../routings'
import { ButtonPrimary } from '@hekori/uikit'
import {
  getBackendCreatePostUrl,
  PostCreateRequest,
} from '@hekori/traqrcode-common'

interface PropsPageList {
  routeInfo: ListRouteInfo
}
export const PageList: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { state, setState, api } = useGlobal()

  return (
    <ShellPublic>
      <Container>
        <ButtonPrimary
          type="submit"
          className={`min-w-full`}
          data-testid="button-create"
          onClick={async () => {
            const data: PostCreateRequest = { test: false }
            await api.post(getBackendCreatePostUrl(), data)
          }}
        >
          + Create PDF
        </ButtonPrimary>
      </Container>
    </ShellPublic>
  )
}
