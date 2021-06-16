import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { ShellPublic } from '../components/ShellPublic'
import { editRoute, ListRouteInfo } from '../routings'
import { ButtonPrimary } from '@hekori/uikit'
import {
  API_CODE,
  getBackendCreatePostUrl,
  getBackendListGetUrl,
  GetListResponse,
  PostCreateRequest,
  PostCreateResponse,
} from '@hekori/traqrcode-common'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { createNewItem } from './edit'

interface PropsPageList {
  routeInfo: ListRouteInfo
}
export const PageList: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { state, setState, api } = useGlobal()
  const history = useHistory()

  const { isLoading, error, data } = useQuery<GetListResponse>(
    'pages',
    async () => {
      return await api.get(getBackendListGetUrl())
    }
  )

  console.log('isLoading', isLoading)

  // if (error) return 'An error has occurred: ' + error.message

  return (
    <ShellPublic loading={isLoading}>
      <Container>
        <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-divider">
            {data?.ids.map((id) => {
              return <li className="p-4">{id}</li>
            })}
          </ul>
        </div>

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
