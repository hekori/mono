import * as React from 'react'
import { useState } from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { useHistory } from 'react-router-dom'
import { dl } from '../dl'
import { Loading } from '../components/Loading'
import { BACKEND_URL, to } from '@hekori/traqrcode-common'
import { ButtonSecondary } from '@hekori/uikit'
import { ViewRouteInfo } from '../routings'
import { useGlobal } from '../index.provider'

type PropsPageView = {
  routeInfo: ViewRouteInfo
}

export const PageView = ({ routeInfo }: PropsPageView) => {
  const { api } = useGlobal()
  const [loading, setLoading] = useState<boolean>(false)

  const download = async () => {
    setLoading(true)
    const [err, res] = await to(api.getBlob(`/pdf/${routeInfo.pageUuid}`))
    setLoading(false)
    if (err) {
      console.log('error', err)
    } else {
      await dl(res, `${routeInfo.pageUuid}.pdf`)
    }
  }

  const history = useHistory()

  if (loading) {
    return <Loading />
  }

  return (
    <ShellPublic>
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen mt-12">
        <ButtonSecondary className="min-w-full mb-4" onClick={download}>
          Download PDF
        </ButtonSecondary>

        <ButtonSecondary
          className="min-w-full mb-4"
          onClick={() => {
            window.location.href = `${BACKEND_URL}/pdf/${routeInfo.pageUuid}`
          }}
        >
          View PDF
        </ButtonSecondary>

        <ButtonSecondary
          className="min-w-full mb-4"
          onClick={() => {
            history.push(`/edit/${routeInfo.pageUuid}`)
          }}
        >
          Edit
        </ButtonSecondary>
      </div>
    </ShellPublic>
  )
}
