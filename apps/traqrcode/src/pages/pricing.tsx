import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { ShellPublic } from '../components/ShellPublic'
import { SectionHeader } from '../components/SectionHeader'
import { ButtonSecondary } from '@hekori/uikit'

export const PagePricing: React.FC = () => {
  const history = useHistory()

  return (
    <ShellPublic>
      <section className="bg-document text-onDocument py-8" id="pricing">
        <div className="container mx-auto px-2 pt-4 pb-12">
          <SectionHeader title="Pricing" />
          <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-l-2xl bg-document2 text-onDocument mt-4">
              <div className="flex-1 overflow-hidden">
                <div className="p-8 text-3xl font-bold text-center">Free</div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">
                    Everything of the pro account
                  </li>
                  <li className="border-b py-4">Try without risk</li>
                  <li className="border-b py-4">
                    Maximum validity of QR codes: 1 year
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
                      history.push('/create')
                    }}
                  >
                    Get started for free
                  </ButtonSecondary>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-t-2xl bg-document3 text-onDocument mt-4 sm:-mt-6 hover:shadow-lg z-10">
              <div className="flex-1 overflow-hidden">
                <div className="w-full p-8 text-3xl font-bold text-center">
                  Pro (Cloud)
                </div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">
                    Admin dashboard and analytics
                  </li>
                  <li className="border-b py-4">Unlimited emails</li>
                  <li className="border-b py-4">
                    Unlimited validity of QR Codes
                  </li>
                </ul>
              </div>
              <div className="flex-none mt-auto overflow-hidden p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  € 60 <span className="text-base">/ per month</span>
                </div>
                <div className="flex items-center justify-center my-6">
                  <ButtonSecondary>100% customer satisfaction</ButtonSecondary>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-2xl sm:rounded-none sm:rounded-r-2xl bg-document2 text-onDocument mt-4">
              <div className="flex-1 overflow-hidden">
                <div className="p-8 text-3xl font-bold text-center">
                  On Premise
                </div>
                <ul className="w-full text-center text-sm">
                  <li className="border-b py-4">Host on on premise</li>
                  <li className="border-b py-4">
                    Easy installation on Azure, AWS or Linux
                  </li>
                  <li className="border-b py-4">
                    Ready to use Docker container for Kubernetes
                  </li>
                  <li className="border-b py-4">100% White labelling </li>
                  <li className="border-b py-4">
                    Use your own domain, logo and color theme
                  </li>
                  <li className="border-b py-4">Lifetime license</li>
                  <li className="border-b py-4">One year of free updates</li>
                  <li className="border-b py-4">Active Directory SSO</li>
                </ul>
              </div>
              <div className="flex-none mt-auto overflow-hidden p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  € 1200 <span className="text-base"> / domain</span>
                </div>
                <div className="flex items-center justify-center my-6">
                  <ButtonSecondary>100% customer satisfaction</ButtonSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ShellPublic>
  )
}
