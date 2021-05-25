/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Main } from './Main'
import { LeftNavigation } from './LeftNavigation'

export const Shell = () => {
  return (
    <BrowserRouter>
      <div className="h-screen flex overflow-hidden bg-primary-background">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <i className="mdi mdi-book mr-4 text-4xl text-blue-300" />
                  <span className="text-4xl text-blue-300">uibook</span>
                </div>
                <LeftNavigation />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Main />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
