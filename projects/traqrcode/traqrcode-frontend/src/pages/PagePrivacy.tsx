import * as React from 'react'
import { Shell } from '../components/Shell'
import { APP_NAME } from '@hekori/traqrcode-common'

export const PagePrivacy = () => {
  return (
    <Shell>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8 px-4">
          {' '}
          <h2 className="text-3xl mb-3">Privacy</h2>
          <p className="text-md">
            {' '}
            {APP_NAME} sends out an email notification when a QR code is scanned
            or a link to {APP_NAME} gets clicked.
          </p>
          <h2 className="text-xl mb-2 mt-4">
            What personal data do you collect and how is it used?
          </h2>
          We store email addresses
          <ul className="list-disc pl-4">
            <li>to send out email notifications</li>
            <li>to authenticate users</li>
            <li>
              to communicate with users, e.g., to make them aware of changes and
              offers
            </li>
          </ul>
          <h2 className="text-xl mb-2 mt-4">
            Can I unsubscribe from notifications
          </h2>
          Yes. You can opt out at any time.
          <h2 className="text-xl mb-2 mt-4">
            How long will my data be stored?
          </h2>
          We delete data when we no longer need it to provide our service. This
          implies that we might delete data after a certain time of inactivity.
          E.g., when a QR code has not been scanned in two years, we might delete it
          and associated email addresses.
          <h2 className="text-xl mb-2 mt-4">
            Where is the data stored?
          </h2>
          We are hosted on servers in the EU.
        </div>
      </div>
    </Shell>
  )
}
