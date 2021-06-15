import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { ShellPublic } from '../components/ShellPublic'
import { editRoute, ListRouteInfo } from '../routings'
import { ButtonPrimary } from '@hekori/uikit'
import {
  API_CODE,
  getBackendCreatePostUrl,
  PostCreateRequest,
  PostCreateResponse,
} from '@hekori/traqrcode-common'
import { useHistory } from 'react-router-dom'

interface PropsPageList {
  routeInfo: ListRouteInfo
}
export const PageList: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { state, setState, api } = useGlobal()
  const history = useHistory()

  return (
    <ShellPublic>
      <Container>
        <ButtonPrimary
          type="submit"
          className={`min-w-full`}
          data-testid="button-create"
          onClick={async () => {
            const data: PostCreateRequest = {}
            const response = await api.post<
              PostCreateResponse,
              PostCreateRequest
            >(getBackendCreatePostUrl(), data)

            console.log('response=', response)
            if (response.status === API_CODE.OK)
              history.push(editRoute({ pageUuid: response.pageUuid }))
          }}
        >
          + Create PDF
        </ButtonPrimary>
      </Container>
    </ShellPublic>
  )
}
