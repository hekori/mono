import { useHistory } from 'react-router-dom'
import * as React from 'react'
import mobileScanningSvg from '../assets/frontpage/mobile_scanning_qr.svg'
import {
  ButtonPrimary,
  ButtonSecondary,
  ExternalLink,
  TextSubtitle,
} from '@hekori/uikit'
import { SectionHeader } from '../components/SectionHeader'
import { DASHBOARD_ROUTE, SIGNUP_ROUTE } from '../routing/routingPaths'
import { Shell } from '../components/Shell'
import { isLoggedIn } from '../utils/utilsUserLoggedIn'
import {
  mdiDocker,
  mdiLanguageTypescript,
  mdiLinux,
  mdiReact,
  mdiTailwind,
} from '@mdi/js'
import Icon from '@mdi/react'

export type TypeErrors = {
  email?: string
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
            aria-label="Get started"
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
      <div className="md:h-128 border-b border-divider py-16">
        <div className="text-center px-3 lg:px-0 md:my-32 flex flex-col items-center">
          <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
            Track QR Code Scans
          </h1>
          <p className="leading-normal text-onDocument2 text-base md:text-xl lg:text-2xl mb-8">
            Get notified by email when your QR code gets scanned.
          </p>
          <p className="leading-normal text-onDocument2 text-base md:text-xl lg:text-2xl mb-8">
            No installation necessary! Use your favorite browser and email
            client.
          </p>

          <ButtonPrimary
            aria-label="Create QR Code"
            onClick={() =>
              isLoggedIn()
                ? history.push(DASHBOARD_ROUTE)
                : history.push(SIGNUP_ROUTE)
            }
          >
            Create QR Code
          </ButtonPrimary>
        </div>
      </div>
      <section className="bg-document2 text-onDocument border-b border-divider py-12 mt-22">
        <div className="container mx-auto flex flex-wrap items-center justify-between pb-12">
          <SectionHeader title="Built with" />

          <div className="flex flex-1 flex-wrap max-w-4xl mx-auto items-center justify-between text-xl text-onDocument3 font-bold opacity-75">
            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <Icon path={mdiReact} className="mr-2 h-8 mr-4" />
              React
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <Icon path={mdiLanguageTypescript} className="mr-2 h-8 mr-4" />
              Typescript
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <Icon path={mdiTailwind} className="mr-2 h-8 mr-4" />
              Tailwind
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <Icon path={mdiLinux} className="mr-2 h-8 mr-4" />
              Linux
            </span>

            <span className="w-1/2 p-4 md:w-auto flex items-center">
              <Icon path={mdiDocker} className="mr-2 h-8 mr-4" />
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
          <SectionHeader title="How it works" />

          <div className="flex flex-wrap text-onDocument2">
            <div className="w-5/6 sm:w-1/2 p-6">
              <TextSubtitle>As a Manager I can</TextSubtitle>
              <span className="mb-8">
                <ol className="list-disc">
                  <li>create one or many PDFs in DIN A4 format.</li>
                  <li>produce high-quality print outs.</li>
                  <li>put them wherever I want.</li>
                  <li>
                    assign responsibilities to my team and track their progress.
                  </li>
                </ol>
              </span>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img
                alt="QR codes for scanning"
                className="object-contain h-96 w-full"
                src="../assets/frontpage/example_pdf.png"
              />
            </div>
          </div>

          <div className="flex flex-wrap text-onDocument2">
            <div className="w-5/6 sm:w-1/2 p-6">
              <TextSubtitle>As a User</TextSubtitle>
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
      <section className="bg-document2 text-onDocument border-b border-divider py-8">
        <div className="max-w-screen-xl container mx-auto flex flex-wrap pt-4 pb-12">
          <SectionHeader title="Your benefits" />

          <BenefitsCard
            superTitle={'Hotels'}
            title={'Improve room service'}
            text={`By placing a printout in each room in your hotel, guests can 
request new towels or the room service on demand. All requests
are automatically logged and your personnel is notified.`}
            onClick={() => {
              history.push('/signup')
            }}
          />
          <BenefitsCard
            superTitle={'Offices'}
            title={'Reduce costs'}
            text={`Fix things on demand when your employees need it.`}
            onClick={() => {
              history.push('/signup')
            }}
          />
          <BenefitsCard
            superTitle={'Public Facilities'}
            title={'Improve quality'}
            text={`Prevent bad customer experience. Be in touch with your customers.`}
            onClick={() => {
              history.push('/signup')
            }}
          />
        </div>
      </section>
      <section
        className="bg-document text-onDocument border-b border-divider py-8"
        id="open-source"
      >
        <div className="container max-w-5xl mx-auto m-8">
          <SectionHeader title="Open Source Community Edition" />

          <div className="flex flex-wrap text-onDocument2">
            <ExternalLink href="https://github.com/hekori/mono">Download</ExternalLink>
            &nbsp; and install Traqrcode and run it on your own machine!
          </div>
        </div>
      </section>
    </Shell>
  )
}
