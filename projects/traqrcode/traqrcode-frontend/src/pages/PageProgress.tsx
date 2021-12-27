import * as React from 'react'
import { useGlobal } from '../hooks/useGlobal'

import { useHistory } from 'react-router-dom'
import { useCheckLoggedIn } from '../hooks/useCheckLoggedIn'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { DetailsRouteInfo, editRoute, taskRoute } from '../routings'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  API_CODE,
  GetActResponse,
  getBackendDetailsGetUrl,
  GetDetailsResponse,
} from '@hekori/traqrcode-common'
import { Container } from '../components/Container'
import { Loading } from '../components/Loading'
import { Error500 } from '../components/Error500'
import { ButtonFlat, TextLarge, TextSmall } from '@hekori/uikit'
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { ProgressInfo } from '../components/ProgressInfo'
import { getLoggedInUserUuid } from '../utils'
import { mdiEmail, mdiProgressCheck, mdiProgressClock } from '@mdi/js'

type PropsPageDetails = {
  routeInfo: DetailsRouteInfo
}

export const PageProgress = ({ routeInfo }: PropsPageDetails) => {
  useCheckLoggedIn()
  const loggedInUserUuid = getLoggedInUserUuid()

  const { api } = useGlobal()
  const history = useHistory()
  const queryClient = useQueryClient()

  const setTaskDoneMutation = useMutation<
    GetActResponse,
    unknown,
    {
      action: 'start' | 'stop'
      pageItemProgressUuid: string
      userUuid: string
    }
  >(
    async ({ action, pageItemProgressUuid, userUuid }) => {
      console.log('called mutationFn')
      const response = await api.get(
        `/act/${action}/${pageItemProgressUuid}/${userUuid}`
      )
      console.log('response=', response)
      return response
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries('details')
      },

      onSuccess: async (response, variables, context) => {
        console.log('called onSuccess')
        console.log('response=', response)
        if (response.status === API_CODE.OK) {
          // await queryClient.invalidateQueries('pages')
          // history.push(editRoute({ pageUuid: response.pageUuid }))
        }
      },
      onError: (error, variables, context) => {
        console.log('called onError')
        console.log(error)
      },
    }
  )

  const { isLoading, error, data } = useQuery<GetDetailsResponse>(
    `details`,
    async () => {
      return api.get(getBackendDetailsGetUrl())
    }
  )

  let content
  if (isLoading || !data) content = <Loading />
  else if (error || data.status === 'ERROR') content = <Error500 />
  else {
    content = (
      <div className="bg-document2 text-onDocument2 shadow sm:rounded-md">
        {data.ids.length === 0 && (
          <TextLarge>
            {' '}
            There are not tasks yet. Print out a PDF and scan a QR code with our
            mobile phone to get started.
          </TextLarge>
        )}
        <ul className="divide-y divide-divider">
          {data.ids.map((pageProgressUuid) => {
            const item = data.idToItem[pageProgressUuid]
            return (
              <li
                key={pageProgressUuid}
                className="p-4 grid lg:grid-cols-12 grid-cols-1 gap-1 hover:bg-touchableHighlight"
              >
                <span className="text-left col-span-2">
                  <TextLarge>{item.pageTitle}</TextLarge> <br />
                  <TextLarge>{item.pageItemTitle}</TextLarge>
                  <br />
                  <TextSmall>{item.pageItemSubTitle}</TextSmall>
                </span>

                <ProgressInfo
                  className="col-span-3"
                  done={!!item.pageItemProgressCreatedAt}
                  mdiIcon={mdiEmail}
                  date={item.pageItemProgressCreatedAt || ''}
                  textPending={'Task created'}
                  textDone={`Task created`}
                  onClick={
                    item.pageItemProgressCreatedAt
                      ? undefined
                      : (e) => {
                          e.stopPropagation()
                          console.log('bla')
                        }
                  }
                />
                <ProgressInfo
                  className="col-span-3"
                  done={!!item.pageItemProgressStartedAt}
                  mdiIcon={mdiProgressClock}
                  date={item.pageItemProgressStartedAt || ''}
                  textPending={'Waiting ...'}
                  textDone={`Accepted by ${item.userEmail}`}
                  onClick={
                    item.pageItemProgressFinishedAt
                      ? undefined
                      : (e) => {
                          e.stopPropagation()
                          setTaskDoneMutation.mutate({
                            action: 'start',
                            userUuid: loggedInUserUuid,
                            pageItemProgressUuid: item.pageItemProgressUuid,
                          })
                        }
                  }
                />
                <ProgressInfo
                  className="col-span-3"
                  done={!!item.pageItemProgressFinishedAt}
                  mdiIcon={mdiProgressCheck}
                  date={item.pageItemProgressFinishedAt || ''}
                  textPending={'Waiting ...'}
                  textDone={`Task done by ${item.userEmail}`}
                  onClick={
                    item.pageItemProgressFinishedAt
                      ? undefined
                      : (e) => {
                          e.stopPropagation()
                          setTaskDoneMutation.mutate({
                            action: 'stop',
                            userUuid: loggedInUserUuid,
                            pageItemProgressUuid: item.pageItemProgressUuid,
                          })
                        }
                  }
                />
                <div className="col-span-1 flex flex-row">
                  <ButtonFlat
                    onClick={(e) => {
                      e.stopPropagation()
                      history.push(
                        taskRoute({
                          pageItemProgressUuid: item.pageItemProgressUuid,
                        })
                      )
                    }}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </ButtonFlat>

                  <ButtonFlat
                    onClick={(e) => {
                      e.stopPropagation()
                      history.push(editRoute({ pageUuid: item.pageUuid }))
                    }}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </ButtonFlat>
                </div>
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
