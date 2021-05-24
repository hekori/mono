import { BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import { KeyToString } from '../../traqrcode-common/src/interfaces/generic'
import { Item } from '../../traqrcode-common/src/interfaces/models'

export const initialState: State = {
  shortHash: '',
  accessToken: '',
  admin: '',
  workerIds: [],
  idToWorker: {},
  idToItem: {},
  itemIds: [],
}

export interface State {
  shortHash: string
  accessToken: string
  admin: string
  idToWorker: KeyToString
  workerIds: string[]
  idToItem: { [index: string]: Item }
  itemIds: string[]
}

export type StateContext = {
  state: State
  setState: any
}

type ProviderProps = {
  children: any
}

export const ContextState = React.createContext<StateContext>({
  state: initialState,
  setState: () => {},
})

export const Provider = ({ children }: ProviderProps) => {
  const [state, setState] = React.useState<State>(initialState)

  return (
    <ContextState.Provider value={{ state, setState }}>
      <Router>{children}</Router>
    </ContextState.Provider>
  )
}
