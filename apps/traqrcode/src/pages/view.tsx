import * as React from 'react'
import { useState } from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { useHistory } from 'react-router-dom'
import { api } from '../api'
import { dl } from '../dl'
import { Loading } from '../components/Loading'
import { BACKEND_URL } from '../../../../libs/traqrcode-common/src/lib/settings'
import { to } from '../../../../libs/traqrcode-common/src/lib/misc'
import { ButtonPrimary, ButtonSecondary } from '@hekori/uikit'
import { AdminRouteInfo } from '../routings'

type PropsPageView = {
  routeInfo: AdminRouteInfo
}

export const PageView = ({ routeInfo }: PropsPageView) => {
  const [loading, setLoading] = useState<boolean>(false)

  const download = async () => {
    setLoading(true)
    const [err, res] = await to(api.getBlob(`/pdf/${routeInfo.shortHash}`))
    setLoading(false)
    if (err) {
      console.log('error', err)
    } else {
      await dl(res, `${routeInfo.shortHash}.pdf`)
    }
  }

  const history = useHistory()

  if (loading) {
    return <Loading />
  }

  return (
    <ShellPublic>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8 p-4">
          <ButtonSecondary className="min-w-full mb-4" onClick={download}>
            Download PDF
          </ButtonSecondary>

          <ButtonSecondary
            className="min-w-full mb-4"
            onClick={() => {
              window.location.href = `${BACKEND_URL}/pdf/${routeInfo.shortHash}`
            }}
          >
            View PDF
          </ButtonSecondary>

          <ButtonSecondary
            className="min-w-full mb-4"
            onClick={() => {
              history.push(
                `/edit/${routeInfo.shortHash}/${routeInfo.accessToken}`
              )
            }}
          >
            Edit
          </ButtonSecondary>
        </div>
      </div>
    </ShellPublic>
  )
}
