import * as React from 'react'
import { SyntheticEvent } from 'react'
import { GlobalContext, useGlobal } from '../index.provider'

import QRCode from 'qrcode.react'
import {
  API_CODE,
  getItemUrl,
  MAX_QR_SUBTITLE_LENGTH,
  MAX_QR_TITLE_LENGTH,
  PageEditErrors,
} from '@hekori/traqrcode-common'
import { ButtonFlat, Input, themes } from '@hekori/uikit'
import { TrashIcon } from '@heroicons/react/outline'
import { PageEditState } from '../../../../libs/traqrcode-common/src/lib/interfaces/edit'

type ReqProps = {
  pageItemUuid: string
  onClickDelete: (e: SyntheticEvent) => void
  errors: PageEditErrors
  setErrors: any
  state: PageEditState
  setState: (value: PageEditState) => void
}

export const Req = ({
  pageItemUuid,
  onClickDelete,
  errors,
  setErrors,
  state,
  setState,
}: ReqProps) => {
  const { state: globalState } = useGlobal()
  const item = state.uuidToPageItem[pageItemUuid]
  console.log('errors', errors)
  const titleErrors = errors?.field?.[`${pageItemUuid}---title`] ?? []
  const subTitleErrors = errors?.field?.[`${pageItemUuid}---subTitle`] ?? []

  // if (
  //   item.title.length > MAX_QR_TITLE_LENGTH &&
  //   !titleErrors.includes(API_CODE.ERROR_TITLE_TOO_LONG)
  // )
  //   titleErrors = [API_CODE.ERROR_TITLE_TOO_LONG]
  //
  // if (
  //   item.subTitle.length > MAX_QR_TITLE_LENGTH &&
  //   !titleErrors.includes(API_CODE.ERROR_SUBTITLE_TOO_LONG)
  // )
  //   subTitleErrors = [API_CODE.ERROR_SUBTITLE_TOO_LONG]

  return (
    <li className="px-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
        <QRCode
          value={getItemUrl(pageItemUuid)}
          renderAs="svg"
          bgColor={'transparent'}
          fgColor={themes[globalState.theme].onDocumentHighlight}
          style={{ width: '48px', height: 'auto' }}
        />
        <div className="w-4 h-4" />
        <Input
          placeholder="Enter title"
          autoFocus
          className={'text-lg'}
          value={item.title}
          errors={titleErrors}
          onChange={(e) => {
            const newState = { ...state }
            newState.uuidToPageItem[pageItemUuid].title = e.target.value
            setState(newState)

            // reset errors
            const newErrors = {
              ...errors,
              ...{
                ...errors.field,
                [`${pageItemUuid}---title`]: undefined,
                [`${pageItemUuid}---subTitle`]: undefined,
              },
            }
            setErrors(newErrors)
          }}
        />
        <div className="w-4 h-4" />
        <Input
          placeholder="Enter additional info"
          value={item.subTitle}
          className={'text-lg'}
          errors={subTitleErrors}
          onChange={(e) => {
            const newState = { ...state }
            newState.uuidToPageItem[pageItemUuid].subTitle = e.target.value
            setState(newState)
          }}
        />
        <ButtonFlat onClick={onClickDelete}>
          <TrashIcon className="h-5 w-5" />
        </ButtonFlat>
      </div>
    </li>
  )
}

type ReqNewProps = {
  text: string
  onClick: (e: SyntheticEvent) => void
}

export const ReqNew = ({ onClick, text }: ReqNewProps) => {
  return (
    <div
      className="req cursor-pointer justify-center items-center bg-gray-300 hover:bg-gray-200 text-lg h-16"
      onClick={onClick}
    >
      {text}
    </div>
  )
}
