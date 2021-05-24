import { useHistory } from 'react-router-dom'
import * as React from 'react'
import { Shell } from '../components/shell'

import progressSvg from '../assets/frontpage/progress.svg'
import workersSvg from '../assets/frontpage/workers.svg'
import emailSentSvg from '../assets/frontpage/email_sent.svg'
import mobileScanningSvg from '../assets/frontpage/mobile_scanning_qr.svg'

export type TypeErrors = {
  admin?: string
  global?: string
}

export const PageFront = () => {
  const history = useHistory()

  return (
    <Shell>
      <div className="container mx-auto h-screen-50">
        <div className="text-center px-3 lg:px-0">
          <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
            Track QR Code Scans
          </h1>
          <p className="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8">
            Get notified by email when your QR code gets scanned.
          </p>

          <button className="button" onClick={() => history.push('/create')}>
            Create QR Code
          </button>
          {/*<a*/}
          {/*  href="#"*/}
          {/*  className="inline-block mx-auto lg:mx-0 hover:underline bg-transparent text-gray-600 font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8"*/}
          {/*>*/}
          {/*  View Additional Action*/}
          {/*</a>*/}
        </div>

        {/*<div className="flex items-center w-full mx-auto content-end">*/}
        {/*  <div className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"/>>*/}
        {/*</div>*/}
      </div>
      <section className="bg-white border-b py-12 mt-22">
        <div className="container mx-auto flex flex-wrap items-center justify-between pb-12">
          <h2 className="w-full my-2 text-xl font-black leading-tight text-center text-gray-800 lg:mt-8">
            Built with
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-1 flex-wrap max-w-4xl mx-auto items-center justify-between text-xl text-gray-500 font-bold opacity-75">
            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-react mr-4 text-4xl" />
              React
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-language-typescript mr-4 text-4xl" />
              Typescript
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-tailwind mr-4 text-4xl" />
              Tailwind
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-linux mr-4 text-4xl" />
              Linux
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-debian mr-4 text-4xl" />
              Debian
            </span>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 border-b py-8" id="how-it-works">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
            How it works
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Scan QR code
              </h3>
              <p className="text-gray-600 mb-8">
                Use your mobile phone to scan a QR code
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img
                alt="scan with mobile phone"
                src={mobileScanningSvg}
                className="h-48"
              />
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <img alt="sending email" src={emailSentSvg} className="h-48" />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Recipients get email
                </h3>
                <p className="text-gray-600 mb-8">
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Receipients start work
              </h3>
              <p className="text-gray-600 mb-8">
                <br />
                <br />
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img alt="workes do the job" src={workersSvg} className="h-48" />
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <img
                alt="track the progresss"
                src={progressSvg}
                className="h-48"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Get real time progress of the task
                </h3>
                <p className="text-gray-600 mb-8">
                  on your mobile phone
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
            Benefits
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                  NO SIGNUP NECESSARY
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Get anonymous feedback
                </div>
                <p className="text-gray-600 text-base px-6 mb-5">
                  Print the PDF and hang it out in your facility.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-start">
                <button
                  className="mx-auto lg:mx-0 hover:underline"
                  onClick={() => history.push('/create')}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                  NO HIDDEN COSTS
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Increase workforce efficiency
                </div>
                <p className="text-gray-600 text-base px-6 mb-5">
                  Offer task distribution without personal interaction or phone
                  calls.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-start">
                <button
                  className="mx-auto lg:mx-0 hover:underline"
                  onClick={() => history.push('/create')}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full text-gray-600 text-xs md:text-sm px-6 mt-6">
                  ANALYZE
                </p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">
                  Find bottlenecks and improvement potentials
                </div>
                <p className="text-gray-600 text-base px-6 mb-5">
                  All information accessible via email and in the web browser.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-start">
                <button
                  className="mx-auto lg:mx-0 hover:underline"
                  onClick={() => history.push('/create')}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-8" id="pricing">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
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
      <section className="gradient w-full mx-auto text-center pt-6 pb-12 min-h-screen-50">
        <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-white">
          Questions?
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
        </div>

        <h3 className="my-4 text-3xl font-extrabold mb-16">
          Don't hesistate getting in touch!
        </h3>

        <a
          className="mx-auto button lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg"
          href="mailto:info@hekori.com"
        >
          info@hekori.com
        </a>
      </section>
    </Shell>
  )
}
