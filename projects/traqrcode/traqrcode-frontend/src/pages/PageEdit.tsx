import * as React from 'react'
import { useState } from 'react'
import { useGlobal } from '../hooks/useGlobal'
import { Req } from '../components/req'

import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import {
  API_CODE,
  getBackendEditPageGetUrl,
  getBackendEditPagePostUrl,
  GetEditResponse,
  getUuid,
  PageEditErrors,
  PageEditState,
  PostEditRequest,
  PostEditResponse,
  to,
} from '@hekori/traqrcode-common'
import {
  ButtonFlat,
  ButtonSecondary,
  Input,
  TextLarge,
  TextSmall,
  TextSubtitle,
} from '@hekori/uikit'
import { TrashIcon } from '@heroicons/react/outline'
import { PDF_ROUTE } from '../routing/routingPaths'
import { useCheckLoggedIn } from '../hooks/useCheckLoggedIn'
import { useQuery } from 'react-query'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { EditRouteInfo } from '../routing/routingTypes'

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
    pageItemUuid,
    title: '',
    subTitle: '',
    customInstructions: ''
  }
  return newState
}

export const InitialPageEditErrors: PageEditErrors = {
  count: 0,
  field: {},
  global: [],
}

export const PageEdit = ({ routeInfo }: PropsPageEdit) => {
  useCheckLoggedIn()

  const { api } = useGlobal()
  const history = useHistory()
  const [errors, setErrors] = useState<PageEditErrors>(InitialPageEditErrors)

  const [state, setState] = useState<PageEditState>({
    pageItemUuids: [],
    uuidToPageItem: {},
    emails: [],
    title: '',
    pageUuid: routeInfo.pageUuid,
  })

  const { isLoading, isFetching, error, data } = useQuery<GetEditResponse>(
    `page--${routeInfo.pageUuid}`,
    async () => {
      const data = await api.get(getBackendEditPageGetUrl(routeInfo.pageUuid))
      setState((state) => ({ ...state, ...data }))
      return data
    },
    { refetchOnWindowFocus: false }
  )

  let content
  if (isLoading || isFetching || !data) content = <Loading />
  else if ((errors?.global || []).includes(API_CODE.ERROR_NOT_FOUND))
    content = (
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen">
        <div className="mt-8">
          <TextLarge>Could not find the page.</TextLarge>
          <TextSmall>Perhaps it has been deleted?</TextSmall>
        </div>
      </div>
    )
  else
    content = (
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen">
        <div className="mt-8">
          <TextSubtitle>Name your print</TextSubtitle>

          <Input
            placeholder={'Enter title'}
            className={'text-xl'}
            onChange={(e) => {
              setState((state) => {
                return { ...state, title: e.target.value }
              })
            }}
            errors={errors.field.title}
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

          {errors?.global?.includes(API_CODE.ERROR_EMPTY_ITEMS_LIST) && (
            <div className={'text-onError bg-error rounded p-2 mt-4'}>
              Please add at least one QR code.
            </div>
          )}

          <br />
          <br />

          <TextSubtitle>
            Who should be notified when the QR code gets scanned?
          </TextSubtitle>

          <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-divider">
              {state.emails.map((email, index) => {
                return (
                  <li className="p-4 flex flex-col lg:flex-row lg:items-center justify-between">
                    <Input
                      key={`email-${index}`}
                      placeholder={'Enter email'}
                      className={'text-xl'}
                      onChange={(e) => {
                        const newEmails = [...state.emails]
                        newEmails[index] = e.target.value
                        setState({
                          ...state,
                          emails: newEmails,
                        })
                      }}
                      errors={errors?.field?.[email]}
                      value={email}
                    />

                    <ButtonFlat
                      onClick={() => {
                        const newState = { ...state }
                        newState.emails = state.emails.filter(
                          (stateEmail) => email !== stateEmail
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
                  setState({
                    ...state,
                    emails: [...state.emails, ''],
                  })
                }}
              >
                {' '}
                + add another
              </li>
            </ul>
          </div>
          {errors?.global?.includes(API_CODE.ERROR_EMPTY_WORKER_LIST) && (
            <div className={'text-onError bg-error rounded p-2 mt-4'}>
              Add at least one receiver.
            </div>
          )}

          <ButtonSecondary
            className="min-w-full mt-8"
            onClick={async (e) => {
              e.preventDefault()
              const [err, res] = await to(
                api.post<PostEditResponse, PostEditRequest>(
                  getBackendEditPagePostUrl(routeInfo.pageUuid),
                  state
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
                setErrors(res)
              } else {
                history.push(PDF_ROUTE)
              }
            }}
          >
            Save
          </ButtonSecondary>
          {(errors?.count ?? 0) > 0 && (
            <div className={'text-onError bg-error rounded p-2 mt-4'}>
              There were errors. Go up and correct them.
            </div>
          )}

          {(errors?.global || []).map((errorCode) => {
            return (
              <div className={'text-onError bg-error rounded p-2 mt-4'}>
                {errorCode}
              </div>
            )
          })}
        </div>
      </div>
    )

  return <ShellLoggedIn>{content}</ShellLoggedIn>
}
