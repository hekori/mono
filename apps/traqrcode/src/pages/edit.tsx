import * as React from 'react'
import { useState } from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { useGlobal } from '../index.provider'
import { Req } from '../components/req'

import { useHistory } from 'react-router-dom'
import { PageError404 } from './error404'
import { Loading } from '../components/Loading'
import {
  API_CODE,
  getBackendEditPageGetUrl,
  getBackendEditPagePostUrl,
  GetEditResponse,
  getUuid,
  PageEditErrors,
  PostEditRequest,
  PostEditResponse,
  to,
} from '@hekori/traqrcode-common'
import { ButtonFlat, ButtonSecondary, Input, TextSubtitle } from '@hekori/uikit'
import { TrashIcon } from '@heroicons/react/outline'
import { EditRouteInfo } from '../routings'
import { useCheckLoggedIn } from '../hooks/useCheckLoggedIn'
import { useQuery } from 'react-query'
import { PageEditState } from '../../../../libs/traqrcode-common/src/lib/apiSpecs/edit'

type PropsPageEdit = {
  routeInfo: EditRouteInfo
}

interface CreateNewItemArgs {
  state: PageEditState
}

export const createNewItem = ({ state }: CreateNewItemArgs): PageEditState => {
  const newState = { ...state }
  const pageItemUuid = getUuid()
  newState.pageItemUuids.push(pageItemUuid)
  newState.uuidToPageItem[pageItemUuid] = {
    pageUuid: state.pageUuid,
    pageItemUuid,
    title: '',
    subTitle: '',
  }
  return newState
}

export const InitialPageEditErrors: PageEditErrors = {
  count: 0,
  idToWorker: {},
  idToItem: {},
  global: [],
}
export const PageEdit = ({ routeInfo }: PropsPageEdit) => {
  useCheckLoggedIn()

  const { api } = useGlobal()
  const history = useHistory()
  const [errors, setErrors] = useState<PageEditErrors>(InitialPageEditErrors)
  const [loading, setLoading] = useState<boolean>(false)

  const [state, setState] = useState<PageEditState>({
    title: '',
    pageUuid: routeInfo.pageUuid,
    pageItemUuids: [],
    uuidToPageItem: {},
    pageWorkerUuids: [],
    uuidToPageWorker: {},
  })

  console.log('errors=', errors)
  console.log('API_CODE=', API_CODE)

  const { isLoading, error, data } = useQuery<GetEditResponse>(
    `page--${routeInfo.pageUuid}`,
    async () => {
      const data = await api.get(getBackendEditPageGetUrl(routeInfo.pageUuid))
      setState((state) => ({ ...state, title: data.page.title }))
      return data
    }
  )

  console.log('data', data)

  if (loading) return <Loading />

  if ((errors?.global || []).includes(API_CODE.ERROR_NOT_FOUND))
    return <PageError404 />

  return (
    <ShellPublic>
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen">
        <div className="mt-8">
          <TextSubtitle>Name your print</TextSubtitle>

          <Input
            placeholder={'Enter title'}
            className={'text-xl'}
            onChange={(e) => {}}
            value={state.title}
          />

          <br />
          <br />
          <TextSubtitle>Add QR codes</TextSubtitle>

          <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-divider">
              {state.pageItemUuids.map((uuid) => (
                <Req
                  key={uuid}
                  pageItemUuid={uuid}
                  errors={errors}
                  setErrors={setErrors}
                  state={state}
                  setState={setState}
                  onClickDelete={() => {
                    const newState = { ...state }
                    newState.pageItemUuids = state.pageItemUuids.filter(
                      (i) => i !== uuid
                    )
                    setState(newState)
                  }}
                />
              ))}

              <li
                className="lg:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-pointer px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-touchableHighlight"
                onClick={() => {
                  setState(createNewItem({ state }))
                }}
              >
                {' '}
                + add another
              </li>
            </ul>
          </div>

          {errors.global.includes(API_CODE.ERROR_EMPTY_ITEMS_LIST) && (
            <div className={'text-error'}>Please add at least one QR code.</div>
          )}

          <br />
          <br />

          <TextSubtitle>
            Who should be notified when the QR code gets scanned?
          </TextSubtitle>

          <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-divider">
              {state.pageWorkerUuids.map((pageWorkerUuid) => {
                return (
                  <li className="p-4 flex flex-col lg:flex-row lg:items-center justify-between">
                    <Input
                      key={pageWorkerUuid}
                      placeholder={'Enter email'}
                      className={'text-xl'}
                      onChange={(e) => {
                        setState({
                          ...state,
                          uuidToPageWorker: {
                            ...state.uuidToPageWorker,
                            [pageWorkerUuid]: e.target.value,
                          },
                        })
                      }}
                      errors={errors?.idToWorker?.[pageWorkerUuid] ?? []}
                      value={state.uuidToPageWorker[pageWorkerUuid]}
                    />

                    <ButtonFlat
                      onClick={() => {
                        const newState = { ...state }
                        newState.pageWorkerUuids = state.pageWorkerUuids.filter(
                          (itemId) => itemId !== pageWorkerUuid
                        )
                        setState(newState)
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </ButtonFlat>
                  </li>
                )
              })}

              <li
                className="lg:h-16 h-32 flex flex-wrap content-center items-center justify-center cursor-pointer px-8 py-4 text-base font-medium text-onDocument focus:text-onDocument focus:outline-none min-w-full hover:bg-touchableHighlight"
                onClick={() => {
                  const pageWorkerUuid = getUuid()
                  setState({
                    ...state,
                    pageWorkerUuids: [...state.pageWorkerUuids, pageWorkerUuid],
                    uuidToPageWorker: {
                      ...state.uuidToPageWorker,
                      [pageWorkerUuid]: '',
                    },
                  })
                }}
              >
                {' '}
                + add another
              </li>
            </ul>
          </div>
          {errors.global.includes(API_CODE.ERROR_EMPTY_WORKER_LIST) && (
            <div className={'text-error'}>Add at least one receiver.</div>
          )}

          <ButtonSecondary
            className="min-w-full mt-8"
            onClick={async (e) => {
              e.preventDefault()
              const [err, res] = await to(
                api.post<PostEditResponse, PostEditRequest>(
                  getBackendEditPagePostUrl(),
                  {}
                )
              )

              if (err) {
                console.log(err, res)
                setErrors({
                  ...InitialPageEditErrors,
                  global: ['There was an unknown error. That is all we know'],
                })

                return
              }

              console.log('res', res)
              if (res.status === 'ERROR') {
                console.log('error', res.errors)
                setErrors(res.errors)
              } else {
                history.push(`/view/${routeInfo.pageUuid}`)
              }
            }}
          >
            Save
          </ButtonSecondary>
          {errors.count > 0 && (
            <div className={'text-onError bg-error rounded p-2 mt-4'}>
              There were errors. Go up and correct them.
            </div>
          )}
        </div>
      </div>
    </ShellPublic>
  )
}
