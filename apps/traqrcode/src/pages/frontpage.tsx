import { useHistory } from 'react-router-dom'
import * as React from 'react'
import { Shell } from '../components/shell'

import progressSvg from '../assets/frontpage/progress.svg'
import workersSvg from '../assets/frontpage/workers.svg'
import emailSentSvg from '../assets/frontpage/email_sent.svg'
import mobileScanningSvg from '../assets/frontpage/mobile_scanning_qr.svg'
import { ButtonPrimary, ButtonSecondary } from '@hekori/uikit'

export type TypeErrors = {
  admin?: string
  global?: string
}

interface BenefitsCardProps {
  superTitle: string
  title: string
  text: string
  onClick: () => void
}
const BenefitsCard: React.FC<BenefitsCardProps> = ({
  superTitle,
  title,
  text,
  onClick,
}) => {
  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink text-onDocument2 ">
      <div className="flex-1 rounded-t rounded-b-none overflow-hidden shadow bg-document">
        <div className="flex flex-wrap no-underline hover:no-underline">
          <p className="w-full text-xs md:text-sm px-6 mt-6">{superTitle}</p>
          <div className="w-full font-bold text-xl text-onDocument3 px-6">
            {title}
          </div>
          <p className="text-base px-6 mb-5">{text}</p>
        </div>
      </div>
      <div className="flex-none mt-auto rounded-b rounded-t-none overflow-hidden shadow p-6 bg-document">
        <div className="flex items-center justify-start">
          <ButtonSecondary
            className="mx-auto lg:mx-0 hover:underline"
            onClick={onClick}
          >
            Get started
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}

export const PageFront = () => {
  const history = useHistory()

  return (
    <Shell>
      <div className="h-screen-50 border-b border-divider">
        <div className="text-center px-3 lg:px-0">
          <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
            Track QR Code Scans
          </h1>
          <p className="leading-normal text-onDocument2 text-base md:text-xl lg:text-2xl mb-8">
            Get notified by email when your QR code gets scanned.
          </p>

          <ButtonPrimary
            onClick={() => history.push('/create')}
            className={'px-8 py-4'}
          >
            Create QR Code
          </ButtonPrimary>
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
      <section className="bg-document2 text-onDocument border-b border-divider py-12 mt-22">
        <div className="container mx-auto flex flex-wrap items-center justify-between pb-12">
          <h2 className="w-full my-2 text-xl font-black leading-tight text-center lg:mt-8">
            Built with
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-1 flex-wrap max-w-4xl mx-auto items-center justify-between text-xl text-onDocument3 font-bold opacity-75">
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

            {/*<span className="w-1/2 p-4 md:w-auto flex items-center">*/}
            {/*  <i className="mdi mdi-debian mr-4 text-4xl" />*/}
            {/*  Debian*/}
            {/*</span>*/}

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <i className="mdi mdi-docker mr-4 text-4xl" />
              Docker
            </span>
          </div>
        </div>
      </section>
      <section
        className="bg-document text-onDocument border-b border-divider py-8"
        id="how-it-works"
      >
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center">
            How it works
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>

          <div className="flex flex-wrap text-onDocument2">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl font-bold leading-none mb-3 text-onDocument">
                As a Manager I can
              </h3>
              <p className="mb-8">
                <ol className="list-disc">
                  <li>create one or many PDFs in DIN A4 format.</li>
                  <li>produce high-quality print outs.</li>
                  <li>put them wherever I want.</li>
                  <li>
                    assign responsibilities to my team and track their progress.
                  </li>
                </ol>
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img
                className="object-contain h-96 w-full"
                src="../assets/frontpage/exampe_pdf.png"
              />
            </div>
          </div>

          <div className="flex flex-wrap text-onDocument2">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-onDocument font-bold leading-none mb-3">
                As a User
              </h3>
              <p className="mb-8">
                I scan the QR code and receive real-time updates on the
                progress.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img
                className="object-contain h-96 w-full"
                alt="scan with mobile phone"
                src={mobileScanningSvg}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-document2 text-onDocument border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center">
            Your benefits
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
          </div>
          <BenefitsCard
            superTitle={'Hotels'}
            title={'Improve room service'}
            text={`By placing a printout in each room in your hotel, guests can 
request new towels or the room service on demand. All requests
are automatically logged and your personnel is notified.`}
            onClick={() => {
              history.push('/create')
            }}
          />

          <BenefitsCard
            superTitle={'Offices'}
            title={'Reduce costs'}
            text={`Fix things on demand when your employees need it.`}
            onClick={() => {
              history.push('/create')
            }}
          />

          <BenefitsCard
            superTitle={'Public Facilities'}
            title={'Improve quality'}
            text={`Prevent bad customer experience. Be in touch with your customers.`}
            onClick={() => {
              history.push('/create')
            }}
          />
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
