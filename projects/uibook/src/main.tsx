import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

import { Shell } from './app/Shell'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
