import * as React from 'react'
import { useGlobal } from '../index.provider'

import { useHistory } from 'react-router-dom'
import { useCheckLoggedIn } from '../hooks/useCheckLoggedIn'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { DetailsRouteInfo } from '../routings'
import { useQuery } from 'react-query'
import {
  getBackendDetailsGetUrl,
  GetDetailsResponse,
} from '@hekori/traqrcode-common'
import { Container } from '../components/Container'
import { Loading } from '../components/Loading'
import { Error500 } from '../components/Error500'
import { TextLarge, TextSmall } from '@hekori/uikit'
import {CheckCircleIcon, EmojiHappyIcon, EmojiSadIcon} from "@heroicons/react/outline";

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
          {data.ids.map((pageProgressUuid) => (
            <li
              key={pageProgressUuid}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-touchableHighlight"
            >
              <span className="md:text-left">
                <TextLarge>
                  {data.idToItem[pageProgressUuid].pageTitle }
                </TextLarge>

              </span>
              <div className={'w-2'} />
              <span className="md:text-left">
                <TextLarge>
                  {data.idToItem[pageProgressUuid].pageItemTitle }
                </TextLarge>
                <br />
                <TextSmall>
                  {data.idToItem[pageProgressUuid].pageItemSubTitle }
                </TextSmall>
              </span>
              <div className={'w-2'} />
              <span className="flex flex-row">
                {data.idToItem[pageProgressUuid].pageItemProgressCreatedAt ? <CheckCircleIcon className='w-8 h-8 text-success' />: <EmojiSadIcon className='w-8 h-8 text-error' />}
                {data.idToItem[pageProgressUuid].pageItemProgressStartedAt  ? <CheckCircleIcon className='w-8 h-8 text-success' />: <EmojiSadIcon className='w-8 h-8 text-error' />}
                {data.idToItem[pageProgressUuid].pageItemProgressFinishedAt  ? <CheckCircleIcon className='w-8 h-8 text-success' />: <EmojiSadIcon className='w-8 h-8 text-error' />}
              </span>


              <div className={'md:flex-1'} />
            </li>
          ))}
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
