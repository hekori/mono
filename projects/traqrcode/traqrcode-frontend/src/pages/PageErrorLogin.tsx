import * as React from 'react'
import {Shell} from '../components/Shell'


export const PageErrorLogin = () => {
    return (
        <Shell>
            <div
                className="w-1/2 mx-auto min-h-screen-50 flex flex-1 flex-col items-center justify-center text-4xl text-white">
                There was an error logging you in. Please try again in a few minutes. If the error persists, please get
                in touch with the support.
            </div>
        </Shell>
    )
}
