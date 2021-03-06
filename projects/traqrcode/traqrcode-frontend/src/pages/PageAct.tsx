import * as React from 'react'
import { useGlobal } from '../hooks/useGlobal'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import {
  Action,
  ActRouteInfo,
  GetActResponse,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
} from '@hekori/traqrcode-common'
import { useQuery } from 'react-query'
import { Container } from '../components/Container'
import { ButtonSecondary } from '@hekori/uikit'
import { Shell } from '../components/Shell'

type PropsPageAction = {
  routeInfo: ActRouteInfo
}

export const PageAction = ({ routeInfo }: PropsPageAction) => {
  const { state, api } = useGlobal()

  const history = useHistory()

  const { isLoading, isFetching, error, data } = useQuery<GetActResponse>(
    `pageAct--${routeInfo.pageItemProgressUuid}--${routeInfo.userUuid}`,
    async () => {
      return api.get(getFrontendActUrl(routeInfo))
    },
    { refetchOnWindowFocus: false }
  )

  console.log('data', data)

  if (isLoading) return <Loading />
  if (error) return <div> error </div>

  let content = null

  if (routeInfo.action === Action.stop) {
    content = <h1>You have finished the task</h1>
  } else if (routeInfo.action === Action.start) {
    content = <h1>You have accepted the task</h1>
  }

  return (
    <Shell>
      <Container>
        {content}

        <ButtonSecondary
          className="min-w-full mt-8"
          onClick={() => {
            history.push(getFrontendPageItemProgressUrl(routeInfo))
          }}
        >
          View
        </ButtonSecondary>
      </Container>
    </Shell>
  )
}
