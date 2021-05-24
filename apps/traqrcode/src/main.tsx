import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from './index.provider'
import { App } from './app'
import { APP_NAME } from '@hekori/traqrcode-common'

document.title = APP_NAME || 'APP_NAME'
ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
)
