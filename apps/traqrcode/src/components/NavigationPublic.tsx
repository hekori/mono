import { useHistory } from 'react-router-dom'
import * as React from 'react'
import { useState } from 'react'
import { LogoTraqrcode } from '../assets/LogoTraqrcode'
import { ButtonFlat, ButtonPrimary, themes } from '@hekori/uikit'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useGlobal } from '../index.provider'
import { isLoggedIn, logout } from '../utils'
import {
  SIGNUP_ROUTE,
  HOMEPAGE_ROUTE,
  listRegex,
  listRoute,
  PRICING_ROUTE,
} from '../routings'

export const NavigationPublic = () => {
  const history = useHistory()
  const { state, setState } = useGlobal()

  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  return (
    <nav
      id="header"
      className="relative max-w-screen-xl container mx-auto bg-document text-onDocument flex flex-wrap items-center justify-between px-6 py-2 min-h-24"
    >
      <div
        className="font-mono text-white cursor-pointer"
        onClick={() => history.push('/')}
      >
        <LogoTraqrcode color={themes[state.theme]?.onDocument} height={32} />
      </div>

      <div className="block lg:hidden pr-2">
        <ButtonFlat
          aria-label="toggle menu visibility"
          onClick={() => {
            setMenuVisible(!menuVisible)
          }}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </ButtonFlat>
        {/*<button*/}
        {/*  className="flex items-center px-3 py-2 border rounded text-onDocument hover:text-onDocumentHighlight hover:border-teal-500 appearance-none focus:outline-none"*/}
        {/*  onClick={() => {*/}
        {/*    setMenuVisible(!menuVisible)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <svg*/}
        {/*    className="fill-current h-3 w-3"*/}
        {/*    viewBox="0 0 20 20"*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*  >*/}
        {/*    <title>Menu</title>*/}
        {/*    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />*/}
        {/*  </svg>*/}
        {/*</button>*/}
      </div>

      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 text-onDocument p-4 lg:p-0 z-20 ${
          menuVisible ? '' : 'hidden'
        }`}
      >
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <ButtonFlat
              aria-label="toggle light/dark theme"
              onClick={() => {
                setState({
                  ...state,
                  theme:
                    state.theme === 'LightTheme' ? 'DarkTheme' : 'LightTheme',
                })
              }}
            >
              {state.theme === 'DarkTheme' ? (
                <MoonIcon width={24} height={24} />
              ) : (
                <SunIcon width={24} height={24} />
              )}
            </ButtonFlat>
          </li>

          <li className="mr-3">
            <ButtonFlat
              aria-label="Go to home page"
              className={
                window.location.pathname === HOMEPAGE_ROUTE ? 'underline' : ''
              }
              onClick={() => history.push(HOMEPAGE_ROUTE)}
            >
              Home
            </ButtonFlat>
          </li>

          <li className="mr-3">
            <ButtonFlat
              aria-label="Go to pricing page"
              className={
                window.location.pathname.startsWith(PRICING_ROUTE)
                  ? 'underline'
                  : ''
              }
              onClick={() => history.push(PRICING_ROUTE)}
            >
              Pricing
            </ButtonFlat>
          </li>

          {isLoggedIn() && (
            <li className="mr-3">
              <ButtonFlat
                aria-label="List"
                className={
                  window.location.pathname.startsWith(listRoute())
                    ? 'underline'
                    : ''
                }
                onClick={() => history.push(listRoute())}
              >
                List
              </ButtonFlat>
            </li>
          )}

          {!isLoggedIn() && (
            <li className="mr-3">
              <ButtonPrimary
                aria-label="Create QR Code"
                onClick={() => history.push(SIGNUP_ROUTE)}
              >
                Create QR Code
              </ButtonPrimary>
            </li>
          )}

          {isLoggedIn() && (
            <li className="mr-3">
              <ButtonFlat
                aria-label="Logout"
                onClick={() => {
                  logout()
                  setState({ ...state })
                }}
              >
                Logout
              </ButtonFlat>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
