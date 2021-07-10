import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import * as React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { KeyToString } from '../../../libs/traqrcode-common/src/lib/interfaces/generic'
import { Item } from '../../../libs/traqrcode-common/src/lib/interfaces/models'
import { applyTheme } from '@hekori/uikit'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Api } from './api'

export const initialState: State = {
  shortHash: '',
  accessToken: '',
  admin: '',
  workerIds: [],
  idToWorker: {},
  idToItem: {},
  itemIds: [],
  theme: 'DarkTheme',
}

export interface State {
  shortHash: string
  accessToken: string
  admin: string
  idToWorker: KeyToString
  workerIds: string[]
  idToItem: { [index: string]: Item }
  itemIds: string[]
  theme: string
}

export type StateContext = {
  state: State
  setState: (arg0: State) => void
  api: Api
}

type ProviderProps = {
  children: any
}

export const GlobalContext = React.createContext<StateContext>({
  state: initialState,
  setState: () => {},
  api: new Api(),
})

export const useGlobal = () => {
  return React.useContext(GlobalContext)
}

export const Provider = ({ children }: ProviderProps) => {
  const [state, setState] = React.useState<State>(initialState)
  const api = new Api()
  const history = useHistory()

  const queryClient = new QueryClient()

  useLayoutEffect(() => {
    applyTheme(state.theme)
  }, [state.theme])

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{ state, setState, api }}>
        <Router>{children}</Router>
      </GlobalContext.Provider>
    </QueryClientProvider>
  )
}
