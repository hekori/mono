import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import { ButtonFlat, ButtonPrimary } from '@hekori/uikit'

export const Main: React.FC = ({ children }) => {
  return (
    <div className="py-4">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
        <BrowserRouter>
          <Switch>
            <Route path="/ButtonPrimary" exact>
              <ButtonPrimary>Text</ButtonPrimary>
            </Route>
            <Route path="/ButtonFlat" exact>
              <ButtonFlat>Click me</ButtonFlat>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}
