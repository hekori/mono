import * as React from 'react'
import { useGlobal } from '../hooks/useGlobal'
import { Container } from '../components/Container'
import { editRoute } from '../routing/routingPaths'
import {
  API_CODE,
  BACKEND_URL,
  getBackendCreatePagePostUrl,
  getBackendListGetUrl,
  getBackendPageDeleteUrl,
  GetListResponse,
  PostCreateRequest,
  PostCreateResponse,
  to,
} from '@hekori/traqrcode-common'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ButtonFlat, TextLarge, TextSmall } from '@hekori/uikit'
import {
  DocumentDownloadIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import { dateFormatter, timeFormatter } from '@hekori/dates'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { dl } from '../utils/dl'
import { PdfRouteInfo } from '../routing/routingTypes'

interface PropsPageList {
  routeInfo: PdfRouteInfo
}
export const PagePdfs: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { api } = useGlobal()
  const history = useHistory()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery<GetListResponse>(
    'pages',
    async () => {
      return api.get(getBackendListGetUrl())
    }
  )

  const createMutation = useMutation<PostCreateResponse>(
    async () => {
      console.log('called mutationFn')
      const request: PostCreateRequest = {}
      const response = await api.post<PostCreateResponse, PostCreateRequest>(
        getBackendCreatePagePostUrl(),
        request
      )
      console.log('response=', response)
      return response
    },
    {
      onSuccess: async (response, variables, context) => {
        console.log('called onSuccess')
        console.log('response=', response)
        if (response.status === API_CODE.OK) {
          await queryClient.invalidateQueries('pages')
          // history.push(editRoute({ pageUuid: response.pageUuid }))
        }
      },
      onError: (error, variables, context) => {
        console.log('called onError')
        console.log(error)
      },
    }
  )
  // optimistic update https://react-query.tanstack.com/guides/optimistic-updates
  const deleteMutation = useMutation(
    async ({ pageUuid }: { pageUuid: string }) => {
      console.log(
        'called deleteMutation with pageUuid',
        pageUuid,
        getBackendPageDeleteUrl({ pageUuid })
      )
      const response = await api.delete(getBackendPageDeleteUrl({ pageUuid }))
      return response
    },

    {
      onMutate: async ({ pageUuid }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('todos')

        // Snapshot the previous value
        const previous = queryClient.getQueryData('pages')

        // Optimistically update to the new value
        await queryClient.setQueryData('pages', (old: any) => {
          console.log('old=', old)
          const newState = { ...old }
          newState.ids = newState.ids.filter((id: string) => id !== pageUuid)
          return newState
        })

        return previous
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('todos')
      },
    }
  )

  console.log('isLoading', isLoading)

  const download = async (pageUuid: string) => {
    const [err, res] = await to(api.getBlob(`/pdf/${pageUuid}`))
    if (err) {
      console.log('error', err)
    } else {
      await dl(res, `${pageUuid}.pdf`)
    }
  }

  return (
    <ShellLoggedIn loading={isLoading}>
      <Container>
        <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-divider">
            {error && <div>An error has occurred: {error}</div>}

            {data?.ids?.map((pageUuid) => {
              const page = data.idToItem[pageUuid]
              return (
                <li
                  key={pageUuid}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-touchableHighlight"
                >
                  <span className="md:text-left">
                    <TextLarge>{page.title || '<no title>'}</TextLarge>
                    <br />
                    <TextSmall>
                      {dateFormatter(page.createdAt)}{' '}
                      {timeFormatter(page.createdAt)}
                    </TextSmall>
                  </span>

                  <div className={'md:flex-1'} />

                  {/*<ButtonFlat*/}
                  {/*  onClick={(e) => {*/}
                  {/*    e.stopPropagation()*/}
                  {/*    history.push(detailsRoute({ pageUuid }))*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <FastForwardIcon className="h-5 w-5" />*/}
                  {/*</ButtonFlat>*/}

                  <ButtonFlat onClick={() => download(page.pageUuid)}>
                    <DocumentDownloadIcon className="h-5 w-5" />
                  </ButtonFlat>

                  <ButtonFlat
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `${BACKEND_URL}/pdf/${pageUuid}`
                    }}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </ButtonFlat>

                  <ButtonFlat
                    onClick={(e) => {
                      e.stopPropagation()
                      history.push(editRoute({ pageUuid }))
                    }}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </ButtonFlat>
                  <ButtonFlat
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteMutation.mutate({ pageUuid })
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </ButtonFlat>
                </li>
              )
            })}
            {createMutation.isLoading ? (
              <li
                className={
                  'md:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-default px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-button2Hover bg-button2Hover relative'
                }
              >
                <div className="spinner" />
              </li>
            ) : (
              <li
                className={
                  'md:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-pointer px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-button2Hover bg-button2'
                }
                onClick={() => {
                  createMutation.mutate()
                }}
              >
                {' '}
                + Create PDF
              </li>
            )}
          </ul>
        </div>
      </Container>
    </ShellLoggedIn>
  )
}
