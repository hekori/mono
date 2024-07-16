import * as React from 'react'
import { useState } from 'react'
import { useGlobal } from '../hooks/useGlobal'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import {
  Action,
  ActRouteInfo,
  getFrontendActUrl,
  GetTaskResponseOk,
  to,
} from '@hekori/traqrcode-common'
import { Container } from '../components/Container'
import {
  ButtonSecondary,
  TextLarge,
  TextSubtitle,
  TextTitle,
} from '@hekori/uikit'
import { Shell } from '../components/Shell'
import { useQuery } from 'react-query'
import { PageItemProgressSummary } from '../components/PageItemProgressSummary'
import {Card} from "../components/Card";

type PropsPageAction = {
  routeInfo: ActRouteInfo
}

export const PageAction = ({ routeInfo }: PropsPageAction) => {
  const { state, api } = useGlobal()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])

  const {
    isLoading,
    isFetching,
    error,
    data: task,
  } = useQuery<GetTaskResponseOk>(
    `pageItem--${routeInfo.pageItemProgressUuid}`,
    async () => {
      return api.get(`/task/${routeInfo.pageItemProgressUuid}`)
    },
    { refetchOnWindowFocus: false }
  )

  console.log(state)

  let content
  if (isLoading || loading) content = <Loading />
  if (error || errors.length > 0) content = <div>{errors}</div>

  if (content)
    return (
      <Shell>
        <Container>{content}</Container>
      </Shell>
    )

  let actionText = null

  if (routeInfo.action === Action.stop) {
    actionText = 'I have finished the task'
  } else if (routeInfo.action === Action.start) {
    actionText = 'Accept the task'
  }

  console.log('routeInfo')
  console.log(routeInfo)
  let status = ''
  if (task?.startedAt && routeInfo.action === 'start')
    status =
      '⚠️ Warning: ️This task has been started! (possibly by someone else)'
  if (task?.finishedAt)
    status = '⚠️ Good news: This task has been finished already!'

  const disabled = loading || !!task?.finishedAt
  return (
    <Shell>
      <Container>
        <PageItemProgressSummary
          titleLabel={'Request'}
          title={task?.title}
          subTitle={task?.subTitle}
          annotationLabel={'The following annotation has been made'}
          annotation={task?.annotation}
        />


        {status && <div className='text-left'><br/><Card>
          {status}
        </Card></div>}

        {!disabled && (
          <ButtonSecondary
            className="min-w-full mt-8"
            disabled={disabled}
            onClick={async (e) => {
              e.preventDefault()
              if (disabled) return

              setLoading(true)

              const [err, res] = await to(api.get(getFrontendActUrl(routeInfo)))
              console.log(res)

              if (err) {
                console.log(err, res)
                setErrors(err)
                setLoading(false)
                return
              }
              history.push(`/task/${routeInfo.pageItemProgressUuid}`)
            }}
          >
            {actionText}
          </ButtonSecondary>
        )}
      </Container>
    </Shell>
  )
}
