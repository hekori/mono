import * as React from 'react'
import { useGlobal } from '../hooks/useGlobal'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { useQuery } from 'react-query'
import {
  API_CODE,
  GetReadResponse,
  isGetReadResponseOk,
} from '@hekori/traqrcode-common'
import { Error500 } from '../components/Error500'
import { Shell } from '../components/Shell'
import { ReadRouteInfo } from '../routing/routingTypes'

type PropsPageRead = {
  routeInfo: ReadRouteInfo
}

export const PageRead: React.FC<PropsPageRead> = ({ routeInfo }) => {
  const { state, api } = useGlobal()
  const history = useHistory()

  const { isLoading, isFetching, error, data } = useQuery<GetReadResponse>(
    `pageItem--${routeInfo.pageItemUuid}`,
    async () => {
      return api.get(`/read/${routeInfo.pageItemUuid}`)
    },
    { refetchOnWindowFocus: false }
  )

  let content

  if (isLoading || !data) content = <Loading />
  else if (error) content = <Error500 />
  else if (data?.status === API_CODE.ERROR) content = <Error500 />
  else if (isGetReadResponseOk(data)) {
    history.push(`/task/${data.pageItemProgressUuid}`)
  } else {
    console.log('data', data)
    content = (
      <div className="w-full mx-auto text-center pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <ul>
            {data?.errors?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  console.log(state)

  return <Shell>{content}</Shell>
}
