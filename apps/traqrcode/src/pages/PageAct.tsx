import * as React from 'react'
import { useGlobal } from '../index.provider'
import { ShellPublic } from '../components/ShellPublic'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import {
  Action,
  ActRouteInfo,
  getFrontendActUrl,
  getFrontendPageItemProgressUrl,
} from '@hekori/traqrcode-common'
import { useQuery } from 'react-query'
import { GetActResponse } from '../../../../libs/traqrcode-common/src/lib/interfaces/act'
import { Container } from '../components/Container'
import { ButtonPrimary, ButtonSecondary } from '@hekori/uikit'

type PropsPageAction = {
  routeInfo: ActRouteInfo
}

export const PageAction = ({ routeInfo }: PropsPageAction) => {
  const { state, api } = useGlobal()

  const history = useHistory()

  const { isLoading, isFetching, error, data } = useQuery<GetActResponse>(
    `pageAct--${routeInfo.pageItemProgressUuid}--${routeInfo.pageWorkerUuid}`,
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
    <ShellPublic>
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
    </ShellPublic>
  )
}
