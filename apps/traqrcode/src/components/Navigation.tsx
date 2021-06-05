import { useHistory } from 'react-router-dom'
import * as React from 'react'
import { useState } from 'react'
import { LogoTraqrcode } from '../assets/LogoTraqrcode'
import { DarkTheme } from '../../../../libs/uikit/src/lib/themes/DarkTheme'
import { ButtonFlat, ButtonPrimary, themes } from '@hekori/uikit'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useGlobal } from '../index.provider'

export const Navigation = () => {
  const history = useHistory()
  const { state, setState } = useGlobal()

  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  return (
    <nav
      id="header"
      className="relative bg-document text-onDocument flex items-center justify-between px-4 sm:px-6"
    >
      <div className="max-w-screen-xl container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="p-2 h-2 flex items-center">
          <div
            className="font-mono text-white cursor-pointer"
            onClick={() => history.push('/')}
          >
            <LogoTraqrcode
              color={themes[state.theme]?.onDocument}
              height={32}
            />
          </div>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            className="button flex items-center px-3 py-2 border rounded text-onDocument hover:text-onDocumentHighlight hover:border-teal-500 appearance-none focus:outline-none"
            onClick={() => {
              setMenuVisible(!menuVisible)
            }}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 text-onDocument p-4 lg:p-0 z-20 ${
            menuVisible ? '' : 'hidden'
          }`}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {/*<li className="mr-3">*/}
            {/*  <a*/}
            {/*    className="inline-block py-2 px-4 text-onDocument font-bold no-underline"*/}
            {/*    href="#"*/}
            {/*  >*/}
            {/*    Active*/}
            {/*  </a>*/}
            {/*</li>*/}

            <li className="mr-3">
              <ButtonFlat
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
              <ButtonFlat onClick={() => history.push('/pricing')}>
                Pricing
              </ButtonFlat>
            </li>
            <li className="mr-3">
              <ButtonFlat onClick={() => history.push('/#how-it-works')}>
                How it works
              </ButtonFlat>
            </li>
          </ul>
          <ButtonPrimary onClick={() => history.push('/create')}>
            Create QR Code
          </ButtonPrimary>
        </div>
      </div>
    </nav>
  )
}
