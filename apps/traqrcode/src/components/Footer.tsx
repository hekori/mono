import { useHistory } from 'react-router-dom'
import { LogoTraqrcode } from '../assets/LogoTraqrcode'
import * as React from 'react'
import { DarkTheme } from '../../../../libs/uikit/src/lib/themes/DarkTheme'
import { themes } from '@hekori/uikit'
import { useGlobal } from '../index.provider'

export const Footer = () => {
  const history = useHistory()
  const { state } = useGlobal()
  return (
    <footer className="bg-document text-onDocument  ">
      <div className="max-w-screen-xl container mx-auto mt-8 px-8">
        <div className="flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6">
            <div
              className="font-mono cursor-pointer"
              onClick={() => history.push('/')}
            >
              <LogoTraqrcode
                color={themes[state.theme]?.onDocument}
                height={32}
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="uppercase font-extrabold text-onDocument2 md:mb-6">
              Legal
            </p>
            <ul className="list-reset mb-6">
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/terms"
                  className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
                >
                  Terms
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/privacy"
                  className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
                >
                  Privacy
                </a>
              </li>
              <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                <a
                  href="/imprint"
                  className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
                >
                  Imprint
                </a>
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
                  href="https://www.hekori.com"
                  className="font-light no-underline text-onDocument2 hover:text-onDocumentHighlight focus:text-onDocumentHighlight"
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
