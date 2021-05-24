import { AdminRouteInfo } from '../app'
import * as React from 'react'
import { useState } from 'react'
import { Shell } from '../components/shell'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL, to } from '@hekori/traqrcode-common'
import { api } from '../api'
import { dl } from '../dl'
import { Loading } from '../components/Loading'

type PropsPageView = {
  routeInfo: AdminRouteInfo
}

export const PageView = ({ routeInfo }: PropsPageView) => {
  const [loading, setLoading] = useState<boolean>(false)

  const download = async () => {
    setLoading(true)
    let err, res
    ;[err, res] = await to(api.getBlob(`/pdf/${routeInfo.shortHash}`))
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
    <Shell>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8 p-4">
          <button className="button min-w-full mb-4" onClick={download}>
            Download PDF
          </button>

          <button
            className="button min-w-full mb-4"
            onClick={() => {
              location.href = `${BACKEND_URL}/pdf/${routeInfo.shortHash}`
            }}
          >
            View PDF
          </button>

          <button
            className="button min-w-full mb-4"
            onClick={() => {
              history.push(
                `/edit/${routeInfo.shortHash}/${routeInfo.accessToken}`
              )
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </Shell>
  )
}
