import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Shell } from '../components/shell'

export const PagePricing: React.FC = () => {
  const history = useHistory()

  return (
    <Shell>
      <section className="bg-document text-onDocument py-8" id="pricing">
        <div className="container mx-auto px-2 pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center">
            Pricing
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
              <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  Free
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Create QR Codes</li>
                  <li className="border-b py-4">Create PDF</li>
                  <li className="border-b py-4">
                    Send up to 100 emails per day
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                  € 0
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="mx-auto button lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
                    onClick={() => {
                      history.push('/create')
                    }}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 gradient shadow hover:shadow-lg z-10">
              <div className="flex-1 rounded-t rounded-b-none overflow-hidden">
                <div className="w-full p-8 text-3xl font-bold text-center">
                  Pro (Cloud)
                </div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">
                    Everything of the free account
                  </li>
                  <li className="border-b py-4">
                    Admin dashboard and analytics
                  </li>
                  <li className="border-b py-4">Unlimited emails</li>
                </ul>
              </div>
              <div className="flex-none mt-auto rounded-b rounded-t-none overflow-hidden p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  € 60 <span className="text-base">/ per month</span>
                </div>
                <div className="flex items-center justify-center">
                  <a
                    className="mx-auto button lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
                    href="mailto:info@hekori.com"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
              <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  On Premise
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">
                    Host on your own infrastructure
                  </li>
                  <li className="border-b py-4">
                    Easy installation on Azure, AWS or Linux
                  </li>
                  <li className="border-b py-4">Lifetime license</li>
                  <li className="border-b py-4">One year of free updates</li>
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                  € 1200 <span className="text-base">/ per domain</span>
                </div>
                <div className="flex items-center justify-center">
                  <a
                    className="mx-auto button lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
                    href="mailto:info@hekori.com"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
