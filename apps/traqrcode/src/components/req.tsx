import * as React from 'react'
import { SyntheticEvent } from 'react'
import { ContextState } from '../index.provider'

import QRCode from 'qrcode.react'
import { getItemUrl, PageEditErrors } from '@hekori/traqrcode-common'
import { ButtonFlat, Input, themes } from '@hekori/uikit'
import { TrashIcon } from '@heroicons/react/outline'

type ReqProps = {
  itemId: string
  uid: string
  onClickDelete: (e: SyntheticEvent) => void
  errors: PageEditErrors
  setErrors: any
}

export const Req = ({
  itemId,
  uid,
  onClickDelete,
  errors,
  setErrors,
}: ReqProps) => {
  const { state, setState } = React.useContext(ContextState)
  const item = state.idToItem[itemId]
  console.log('errors', errors)
  return (
    <li className="px-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
        <QRCode
          value={getItemUrl(uid, itemId)}
          renderAs="svg"
          bgColor={'transparent'}
          fgColor={themes[state.theme].onDocumentHighlight}
          style={{ width: '48px', height: 'auto' }}
        />
        <div className="w-4 h-4" />
        <Input
          placeholder="Enter title"
          autoFocus
          className={'text-lg'}
          value={item.title}
          errors={errors?.idToItem?.[itemId]}
          onChange={(e) => {
            const newState = { ...state }
            newState.idToItem[itemId].title = e.target.value
            setState(newState)

            // reset errors
            const newErrors = {
              ...errors,
              ...{ ...errors.idToItem, [itemId]: undefined },
            }
            setErrors(newErrors)
          }}
        />
        <div className="w-4 h-4" />
        <Input
          placeholder="Enter additional info"
          value={item.subTitle}
          className={'text-lg'}
          onChange={(e) => {
            const newState = { ...state }
            newState.idToItem[itemId].subTitle = e.target.value
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
