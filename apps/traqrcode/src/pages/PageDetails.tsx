import * as React from 'react'
import { useGlobal } from '../index.provider'

import { useHistory } from 'react-router-dom'
import { useCheckLoggedIn } from '../hooks/useCheckLoggedIn'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { DetailsRouteInfo, editRoute } from '../routings'
import { useQuery } from 'react-query'
import {
  getBackendDetailsGetUrl,
  GetDetailsResponse,
} from '@hekori/traqrcode-common'
import { Container } from '../components/Container'
import { Loading } from '../components/Loading'
import { Error500 } from '../components/Error500'
import { ButtonFlat, TextLarge, TextSmall } from '@hekori/uikit'
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  EmojiSadIcon,
  PencilIcon,
} from '@heroicons/react/outline'
import { ProgressInfo } from '../components/ProgressInfo'
import { getNow, humanReadableTimeDifference } from '@hekori/dates'

type PropsPageDetails = {
  routeInfo: DetailsRouteInfo
}

export const PageDetails = ({ routeInfo }: PropsPageDetails) => {
  useCheckLoggedIn()

  const { api } = useGlobal()
  const history = useHistory()

  const { isLoading, error, data } = useQuery<GetDetailsResponse>(
    `details`,
    async () => {
      return api.get(getBackendDetailsGetUrl())
    }
  )

  let content
  if (isLoading || !data) content = <Loading />
  else if (error) content = <Error500 />
  else {
    content = (
      <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-divider">
          {data.ids.map((pageProgressUuid) => {
            const item = data.idToItem[pageProgressUuid]
            return (
              <li
                key={pageProgressUuid}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between  hover:bg-touchableHighlight"
              >
                <span className="text-left flex-1">
                  <TextLarge>{item.pageTitle}</TextLarge> <br />
                  <TextLarge>{item.pageItemTitle}</TextLarge>
                  <br />
                  <TextSmall>{item.pageItemSubTitle}</TextSmall>
                </span>
                <div className={'w-2'} />

                <ProgressInfo
                  className="flex-1"
                  done={!!item.pageItemProgressCreatedAt}
                  mdiIcon="mdi-email"
                  date={item.pageItemProgressCreatedAt || ''}
                  textPending={'Task created'}
                  textDone={`Task created`}
                />
                <ProgressInfo
                  className="flex-1"
                  done={!!item.pageItemProgressStartedAt}
                  mdiIcon="mdi-progress-clock"
                  date={item.pageItemProgressStartedAt || ''}
                  textPending={'Waiting ...'}
                  textDone={`Accepted by ${item.pageWorkerEmail}`}
                />
                <ProgressInfo
                  className="flex-1"
                  done={!!item.pageItemProgressFinishedAt}
                  mdiIcon="mdi-progress-check"
                  date={item.pageItemProgressFinishedAt || ''}
                  textPending={'Waiting ...'}
                  textDone={`Task done!`}
                />

                <ButtonFlat
                  onClick={(e) => {
                    e.stopPropagation()
                    history.push(editRoute({ pageUuid: item.pageUuid }))
                  }}
                >
                  <PencilIcon className="h-5 w-5" />
                </ButtonFlat>
                {/*<div className={'md:flex-1'} />*/}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <ShellLoggedIn>
      <Container>{content}</Container>
    </ShellLoggedIn>
  )
}
