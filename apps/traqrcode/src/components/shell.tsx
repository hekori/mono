import { useHistory, useLocation } from 'react-router-dom'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { APP_NAME } from '@hekori/traqrcode-common'

export const NavBar = () => {
  const history = useHistory()

  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  return (
    <nav id="header" className="w-full z-30 top-0 text-white py-1 lg:py-6">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6">
        <div className="pl-4 flex items-center">
          <div
            className="font-mono text-white cursor-pointer"
            onClick={() => history.push('/')}
          >
            {APP_NAME}
          </div>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            className="button flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
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
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 ${
            menuVisible ? '' : 'hidden'
          }`}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {/*<li className="mr-3">*/}
            {/*  <a*/}
            {/*    className="inline-block py-2 px-4 text-black font-bold no-underline"*/}
            {/*    href="#"*/}
            {/*  >*/}
            {/*    Active*/}
            {/*  </a>*/}
            {/*</li>*/}

            <li className="mr-3">
              <a
                className="buttonFlat inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/#pricing"
              >
                Pricing
              </a>
            </li>
            <li className="mr-3">
              <a
                className="buttonFlat inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="/#how-it-works"
              >
                How it works
              </a>
            </li>
          </ul>
          <button
            className="button mx-auto lg:mx-0"
            onClick={() => history.push('/create')}
          >
            Create QR Code
          </button>
        </div>
      </div>
    </nav>
  )
}

type ShellProps = {
  children: any
}

export const Shell = ({ children }: ShellProps) => {
  const location = useLocation()
  useEffect(() => {
    if (window.location.href.includes('#')) return
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="gradient leading-relaxed tracking-wide flex flex-col">
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export const Footer = () => {
  const history = useHistory()
  return (
    <footer className="bg-white ">
      <div className="container mx-auto mt-8 px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6">
            <div
              className="font-mono text-black cursor-pointer"
              onClick={() => history.push('/')}
            >
              {APP_NAME}
            </div>
          </div>

          <div className="flex-1">
            <p className="uppercase font-extrabold text-gray-500 md:mb-6">
              Legal
            </p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/terms"
                  className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  Terms
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/privacy"
                  className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  Privacy
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/imprint"
                  className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  Imprint
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <p className="uppercase font-extrabold text-gray-500 md:mb-6">
              Company
            </p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="https://www.hekori.com"
                  className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500"
                >
                  Official Website
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
