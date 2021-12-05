import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { ButtonSecondary } from '@hekori/uikit'
import { Shell } from '../components/Shell'
import { APP_NAME } from '@hekori/traqrcode-common'

export const PagePricing: React.FC = () => {
  const history = useHistory()

  return (
    <Shell>
      <section className="bg-document text-onDocument py-8" id="pricing">
        <div className="container mx-auto px-2 pt-4 pb-12">
          <SectionHeader title="Pricing" />
          <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-l-2xl bg-document2 text-onDocument mt-4">
              <div className="flex-1 overflow-hidden">
                <div className="p-8 text-3xl font-bold text-center">
                  {APP_NAME}
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Try 100% free without risk</li>
                  <li className="border-b py-4">
                    QR codes are valid for twelve months
                  </li>
                  <li className="border-b py-4">
                    Admin dashboard and analytics
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto overflow-hidden p-6">
                <div className="w-full pt-6 text-3xl font-bold text-center">
                  € 0
                </div>
                <div className="flex items-center justify-center my-6">
                  <ButtonSecondary
                    onClick={() => {
                      history.push('/create-qr')
                    }}
                  >
                    Try now!
                  </ButtonSecondary>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-t-2xl bg-document3 text-onDocument mt-4 sm:-mt-6 hover:shadow-lg z-10">
              <div className="flex-1 overflow-hidden">
                <div className="w-full p-8 text-3xl font-bold text-center">
                  {APP_NAME} (Pro)
                </div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">Everything of the free tier</li>
                  <li className="border-b py-4">Use your own domain</li>
                  <li className="border-b py-4">
                    Send emails from your own email address
                  </li>
                  <li className="border-b py-4">QR codes are valid forever</li>
                </ul>
              </div>
              <div className="flex-none mt-auto overflow-hidden p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  € 60 <span className="text-base">/ per month</span>
                </div>
                <div className="flex items-center justify-center my-6 text-center">
                  Send us an email!
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-r-2xl bg-document2 text-onDocument mt-4">
              <div className="flex-1 overflow-hidden">
                <div className="p-8 text-3xl font-bold text-center">
                  Community Edition
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Open Source (MIT license)</li>
                  <li className="border-b py-4">Host on your own server</li>
                  <li className="border-b py-4">Easy installation</li>
                </ul>
              </div>
              <div className="flex-none mt-auto overflow-hidden p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  € 0 <span className="text-base"> forever</span>
                </div>
                <div className="flex items-center justify-center my-6">
                  <ButtonSecondary
                    onClick={() => {
                      window.location.href =
                        'https://github.com/hekori/mono#readme'
                    }}
                  >
                    Fork me on Github!
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
