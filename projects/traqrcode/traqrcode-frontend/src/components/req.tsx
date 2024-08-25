import * as React from 'react'
import {SyntheticEvent} from 'react'
import {useGlobal} from '../hooks/useGlobal'

import QRCode from 'qrcode.react'
import {
    getItemUrl,
    PageEditErrors,
    PageEditState,
} from '@hekori/traqrcode-common'
import {ButtonFlat, Input, themes} from '@hekori/uikit'
import {TrashIcon} from '@heroicons/react/outline'

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
    const {state: globalState} = useGlobal()
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
            <div className="flex flex-1 lg:flex-row flex-col">
                <div className="flex flex-col flex-1 ">

                    <div className="w-4 h-4"/>
                    <Input
                        placeholder="Enter title"
                        autoFocus
                        className={'text-3xl'}
                        value={item.title}
                        errors={titleErrors}
                        onChange={(e) => {
                            const newState = {...state}
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
                    <div className="w-2 h-2"/>
                    <Input
                        placeholder="Enter additional info"
                        value={item.subTitle}
                        className={'text-md'}
                        errors={subTitleErrors}
                        onChange={(e) => {
                            const newState = {...state}
                            newState.uuidToPageItem[pageItemUuid].subTitle = e.target.value
                            setState(newState)
                        }}
                    />
                    <div className="w-2 h-2"/>

                    <div className="text-sm">User feedback instructions</div>
                    <Input
                        placeholder="Enter custom instructions for user feedback. They are displayed after the user has scanned the QR code. Leave empty to skip."
                        value={item.customInstructions}
                        className={'text-md'}
                        errors={subTitleErrors}
                        onChange={(e) => {
                            const newState = {...state}
                            newState.uuidToPageItem[pageItemUuid].customInstructions = e.target.value
                            setState(newState)
                        }}
                    />

                </div>
                <div className="p-4 flex flex-col justify-center">
                    <QRCode
                        value={getItemUrl(pageItemUuid)}
                        renderAs="svg"
                        bgColor={'transparent'}
                        fgColor={themes[globalState.theme].onDocument}
                        style={{width: '128px', height: 'auto'}}
                    />
                    <div className="w-4 h-4"/>
                    <ButtonFlat onClick={onClickDelete}>
                        <TrashIcon className="h-5 w-5"/>
                    </ButtonFlat>

                </div>
            </div>
        </li>
    )
}

type ReqNewProps = {
    text: string
    onClick: (e: SyntheticEvent) => void
}

export const ReqNew = ({onClick, text}: ReqNewProps) => {
    return (
        <div
            className="req cursor-pointer justify-center items-center bg-gray-300 hover:bg-gray-200 text-lg h-16"
            onClick={onClick}
        >
            {text}
        </div>
    )
}
