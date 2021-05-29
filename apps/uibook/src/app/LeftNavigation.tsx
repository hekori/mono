import { useHistory, useLocation } from 'react-router-dom'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { applyTheme, themes } from '@hekori/uikit'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const LeftNavigationItem: React.FC<{ name: string }> = ({ name }) => {
  const location = useLocation()
  const history = useHistory()

  return (
    <span
      onClick={() => history.push(`/${name}`)}
      className={classNames(
        location.pathname !== `/${name}` ? 'bg-primary' : 'bg-secondary',
        'group flex items-center px-2 py-2 text-base font-medium rounded-md text-onButton bg-button hover:bg-secondary cursor-pointer'
      )}
    >
      {name}
    </span>
  )
}

export const LeftNavigation: React.FC = () => {
  const history = useHistory()
  const [theme, setTheme] = useState('LightTheme')

  useEffect(() => {
    console.log('called use effect')
    applyTheme(theme)
  }, [theme])

  console.log(history.location)

  return (
    <nav className="mt-5 px-2 space-y-1">
      <select
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none bg-input text-onInput sm:text-sm rounded-md"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {Object.keys(themes).map((themeOption) => (
          <option key={themeOption}>{themeOption}</option>
        ))}
      </select>

      <LeftNavigationItem name="Typography" />
      <LeftNavigationItem name="Colors" />
      <LeftNavigationItem name="Buttons" />
    </nav>
  )
}
