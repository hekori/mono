import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { ShellPublic } from '../components/ShellPublic'
import { editRoute, ListRouteInfo } from '../routings'
import {
  API_CODE,
  getBackendCreatePagePostUrl,
  getBackendListGetUrl,
  getBackendPageDeleteUrl,
  GetListResponse,
  PostCreateRequest,
  PostCreateResponse,
} from '@hekori/traqrcode-common'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ButtonFlat, classNames } from '@hekori/uikit'
import { Loading } from '../components/Loading'
import { TrashIcon } from '@heroicons/react/outline'

interface PropsPageList {
  routeInfo: ListRouteInfo
}
export const PageList: React.FC<PropsPageList> = ({ routeInfo }) => {
  const { state, setState, api } = useGlobal()
  const queryClient = useQueryClient()

  const history = useHistory()

  const { isLoading, error, data } = useQuery<GetListResponse>(
    'pages',
    async () => {
      return await api.get(getBackendListGetUrl())
    }
  )

  const createMutation = useMutation<PostCreateResponse>(
    async () => {
      const data: PostCreateRequest = {}
      const response = await api.post<PostCreateResponse, PostCreateRequest>(
        getBackendCreatePagePostUrl(),
        data
      )
      return response
    },
    {
      onSuccess: async (response, variables, context) => {
        console.log('response=', response)
        if (response.status === API_CODE.OK) {
          await queryClient.invalidateQueries('pages')
          // history.push(editRoute({ pageUuid: response.pageUuid }))
        }
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

  // if (error) return 'An error has occurred: ' + error.message

  return (
    <ShellPublic loading={isLoading}>
      <Container>
        <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-divider">
            {data?.ids.map((pageUuid) => {
              const page = data.idToItem[pageUuid]
              return (
                <li
                  className="p-4 flex flex-col lg:flex-row lg:items-center justify-between cursor-pointer hover:bg-touchableHighlight"
                  // onClick={() => {
                  //   history.push(editRoute({ pageUuid }))
                  // }}
                >
                  {pageUuid} {page.createdAt} {page.createdBy}
                  <ButtonFlat
                    onClick={() => deleteMutation.mutate({ pageUuid })}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </ButtonFlat>
                </li>
              )
            })}
            {createMutation.isLoading ? (
              <li
                className={
                  'lg:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-default px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-button2Hover bg-button2Hover relative'
                }
              >
                <div className="spinner" />
              </li>
            ) : (
              <li
                className={
                  'lg:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-pointer px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-button2Hover bg-button2'
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
    </ShellPublic>
  )
}
