import * as React from 'react'
import { useEffect, useState } from 'react'
import { Shell } from '../components/shell'
import { ContextState, State } from '../index.provider'
import { Req } from '../components/req'
import { AdminRouteInfo } from '../app'

import { api } from '../api'
import { useHistory } from 'react-router-dom'
import { PageError404 } from './error404'
import { Loading } from '../components/Loading'
import {
  InitialPageEditErrors,
  PageEditErrors,
} from '../../../traqrcode-common/src/interfaces/api'
import { getBackendEditPostUrl } from '../../../traqrcode-common/src/urls'
import { API_CODE } from '../../../traqrcode-common/src/constants'
import { shortuuid, to } from '../../../traqrcode-common/src/misc'
import {
  ButtonFlat,
  ButtonPrimary,
  ButtonSecondary,
  Input,
  TextSubtitle,
} from '@hekori/uikit'

type PropsPageSetup = {
  routeInfo: AdminRouteInfo
}

interface CreateNewItemArgs {
  state: State
}

export const createNewItem = ({ state }: CreateNewItemArgs): State => {
  const newState = { ...state }
  const newIndex = `${Object.keys(newState.idToItem).length}`
  newState.itemIds.push(newIndex)
  newState.idToItem[newIndex] = {
    id: newIndex,
    idToTask: {},
    taskIds: [],
    title: '',
    subTitle: '',
  }
  return newState
}

export const PageSetup = ({ routeInfo }: PropsPageSetup) => {
  const { state, setState } = React.useContext(ContextState)
  const history = useHistory()
  const [errors, setErrors] = useState<PageEditErrors>(InitialPageEditErrors)
  const [loading, setLoading] = useState<boolean>(false)

  console.log('state=', state)
  console.log('errors=', errors)
  console.log('API_CODE=', API_CODE)
  const needLoad = state.shortHash !== routeInfo.shortHash

  useEffect(() => {
    const t = async () => {
      setErrors(InitialPageEditErrors)
      setLoading(true)
      const [err, res] = await to(
        api.get(`/view/${routeInfo.shortHash}/${routeInfo.accessToken}`)
      )
      setLoading(false)

      if (err) {
        console.log(err, res)
        // setErrors({global: [ERRORS.NOT_FOUND]})
        return
      }

      if (res.status === 'ERROR') {
        console.log('error', res.errors)
        setErrors({
          ...errors,
          global: [...(errors.global || []), ...res.errors],
        })
      } else {
        console.log(res)
        let newState = { ...state, ...res.data }

        if (Object.keys(newState.idToItem).length === 0) {
          newState = createNewItem({ state: newState })
        }

        setState(newState)
      }
    }

    if (needLoad) {
      void t()
    }
  }, [needLoad, routeInfo])

  if (loading) return <Loading />

  if ((errors?.global || []).includes(API_CODE.ERROR_NOT_FOUND))
    return <PageError404 />

  return (
    <Shell>
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen">
        <div className="mt-8">
          <TextSubtitle>Describe your QR code</TextSubtitle>

          <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-divider">
              {state.itemIds.map((itemIndex) => (
                <Req
                  key={itemIndex}
                  uid={routeInfo.shortHash}
                  itemIndex={itemIndex}
                  errors={errors}
                  setErrors={setErrors}
                  onClickDelete={() => {
                    const newState = { ...state }
                    newState.itemIds = state.itemIds.filter(
                      (i) => i !== itemIndex
                    )
                    setState(newState)
                  }}
                />
              ))}

              <li>
                <ButtonFlat
                  className="min-w-full"
                  onClick={() => {
                    setState(createNewItem({ state }))
                  }}
                >
                  {' '}
                  + add another
                </ButtonFlat>
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

          {state.workerIds.map((receiver, i) => {
            return (
              <Input
                key={`${i}`}
                placeholder={'Enter email'}
                textSize={'xl'}
                onChange={(e) => {
                  setState({
                    ...state,
                    idToWorker: {
                      ...state.idToWorker,
                      [receiver]: e.target.value,
                    },
                  })
                }}
                errors={errors?.idToWorker?.[receiver] ?? []}
                value={state.idToWorker[receiver]}
              />
            )
          })}

          <ButtonSecondary
            onClick={() => {
              const s = shortuuid()
              setState({
                ...state,
                workerIds: [...state.workerIds, s],
                idToWorker: { ...state.idToWorker, [s]: '' },
              })
            }}
          >
            + Add another
          </ButtonSecondary>
          {errors.global.includes(API_CODE.ERROR_EMPTY_WORKER_LIST) && (
            <div className={'text-error'}>Add at least one receiver.</div>
          )}

          <ButtonPrimary
            className="min-w-full"
            onClick={async (e) => {
              e.preventDefault()
              const [err, res] = await to(
                api.post(getBackendEditPostUrl(), {
                  test: false,
                  createdAt: new Date().toISOString(),
                  shortHash: state.shortHash,
                  accessToken: state.accessToken,
                  admin: state.admin,
                  idToWorker: state.idToWorker,
                  workerIds: state.workerIds,
                  idToItem: state.idToItem,
                  itemIds: state.itemIds,
                })
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
                history.push(
                  `/view/${routeInfo.shortHash}/${routeInfo.accessToken}`
                )
              }
            }}
          >
            Save
          </ButtonPrimary>
          {errors.count > 0 && (
            <div className={'text-error'}>
              There were errors. Go up and correct them.
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}
