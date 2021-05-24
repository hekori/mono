import * as React from 'react'
import { SyntheticEvent } from 'react'
import { InputText } from './inputText'
import { ContextState } from '../index.provider'
import { getItemUrl } from '@hekori/traqrcode-common'
import { PageEditErrors } from '@hekori/traqrcode-common'

import QRCode from 'qrcode.react'

type ReqProps = {
  itemIndex: string
  uid: string
  onClickDelete: (e: SyntheticEvent) => void
  errors: PageEditErrors
  setErrors: any
}

export const Req = ({
  itemIndex,
  uid,
  onClickDelete,
  errors,
  setErrors,
}: ReqProps) => {
  const { state, setState } = React.useContext(ContextState)
  const item = state.idToItem[itemIndex]
  console.log('errors', errors)
  return (
    <div className="req md:flex-row mb-4">
      <div className="flex-1 justify-around">
        <InputText
          placeholder="Enter title"
          autoFocus
          value={item.title}
          errors={errors?.idToItem?.[itemIndex]}
          onChange={(e) => {
            const newState = { ...state }
            newState.idToItem[itemIndex].title = e.target.value
            setState(newState)

            // reset errors
            const newErrors = {
              ...errors,
              ...{ ...errors.idToItem, [itemIndex]: undefined },
            }
            setErrors(newErrors)
          }}
        />
        <InputText
          placeholder="Enter additional info"
          value={item.subTitle}
          onChange={(e) => {
            const newState = { ...state }
            newState.idToItem[itemIndex].subTitle = e.target.value
            setState(newState)
          }}
        />
        <div className="text-xs text-primary">{getItemUrl(uid, itemIndex)}</div>
      </div>
      <div className="md:w-1/4 flex justify-center items-center flex-col">
        <QRCode
          value={getItemUrl(uid, itemIndex)}
          renderAs="svg"
          style={{ width: '50%', height: 'auto' }}
        />
        <button className="button" onClick={onClickDelete}>
          delete
        </button>
      </div>
    </div>
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
