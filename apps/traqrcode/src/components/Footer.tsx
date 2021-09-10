import { Link, useHistory } from 'react-router-dom'
import { LogoTraqrcode } from '../assets/LogoTraqrcode'
import * as React from 'react'
import { themes } from '@hekori/uikit'
import { useGlobal } from '../index.provider'

export const Footer = () => {
  const history = useHistory()
  const { state } = useGlobal()
  return (
    <footer className="relative max-w-screen-xl container mx-auto bg-document text-onDocument flex flex-wrap justify-between px-6 py-8 min-h-24">
      <div
        className="font-mono text-white cursor-pointer flex-1"
        onClick={() => history.push('/')}
      >
        <LogoTraqrcode color={themes[state.theme]?.onDocument} height={32} />
      </div>

      <div className="flex-1">
        <p className="uppercase font-extrabold text-onDocument2 md:mb-6">
          Legal
        </p>
        <ul className="list-reset mb-6">
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <Link
              to="/terms"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Terms
            </Link>
          </li>
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <Link
              to="/privacy"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Privacy
            </Link>
          </li>
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <Link
              to="/imprint"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Imprint
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <p className="uppercase font-extrabold text-onDocument2 md:mb-6">
          Company
        </p>
        <ul className="list-reset mb-6">
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="/"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Home
            </a>
          </li>

          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="/pricing"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Pricing
            </a>
          </li>

          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="https://www.hekori.com"
              className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
            >
              Company Website
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
