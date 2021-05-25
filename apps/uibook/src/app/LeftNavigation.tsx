import { Link, useHistory } from 'react-router-dom'
import * as React from 'react'
import { themes } from '@hekori/uikit'
import { useEffect, useState } from 'react'
import { applyTheme } from '../../../../libs/uikit/src/lib/themes/utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const LeftNavigation: React.FC = () => {
  const history = useHistory()
  const [theme, setTheme] = useState('LightTheme')

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  console.log(history.location.pathname)

  return (
    <nav className="mt-5 px-2 space-y-1">
      <select
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {Object.keys(themes).map((themeOption) => (
          <option key={themeOption}>{themeOption}</option>
        ))}
      </select>
      <Link
        to={'/Typography'}
        className={classNames(
          history.location.pathname === '/Typography'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
        )}
      >
        Typography
      </Link>

      <Link
        to={'/Colors'}
        className={classNames(
          history.location.pathname === '/Colors'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
        )}
      >
        Colors
      </Link>

      <Link
        to={'/Buttons'}
        className={classNames(
          history.location.pathname === '/Buttons'
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
        )}
      >
        Buttons
      </Link>
    </nav>
  )
}
