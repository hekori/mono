import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GlobalProvider } from './hooks/useGlobal'
import 'tailwindcss/tailwind.css'
import { App } from './app'
import { APP_NAME } from '@hekori/traqrcode-common'

document.title = APP_NAME
ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root')
)
