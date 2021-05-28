import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import * as React from 'react'
import { ButtonStory } from './10_ButtonStory'
import { TypographyStory } from './01_TypographyStory'
import { ColorStory } from './02_ColorStory'

export const Main: React.FC = ({ children }) => {
  const location = useLocation()

  return (
    <div className="py-4">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
        <Switch>
          <Route path="/Typography" exact>
            <TypographyStory />
          </Route>
          <Route path="/Colors" exact>
            <ColorStory />
          </Route>
          <Route path="/Buttons" exact>
            <ButtonStory />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
