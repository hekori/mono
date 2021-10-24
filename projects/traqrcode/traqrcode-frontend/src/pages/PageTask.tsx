import * as React from 'react'
import { useGlobal } from '../index.provider'
import { TaskRouteInfo } from '../routings'
import { useQuery } from 'react-query'
import { GetTaskResponseOk } from '@hekori/traqrcode-common'
import { Loading } from '../components/Loading'
import { ProgressInfo, ProgressInfoConnector } from '../components/ProgressInfo'
import { Shell } from '../components/Shell'

type PropsPageTask = {
  routeInfo: TaskRouteInfo
}

export const PageTask = ({ routeInfo }: PropsPageTask) => {
  const { state, api } = useGlobal()
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

  if (isLoading || !task) content = <Loading />
  else {
    content = (
      <div className="max-w-screen-xl container mx-auto px-6 pt-6 pb-12 min-h-screen">
        <ProgressInfo
          done={!!task.createdAt}
          mdiIcon="mdi-email"
          date={task.createdAt || ''}
          textPending={'Waiting ...'}
          textDone={`Request for "${task.title}" ${
            task.subTitle ? `"${task.subTitle}"` : ''
          } has been received`}
        />
        <ProgressInfoConnector done={!!task.startedAt} />
        <ProgressInfo
          done={!!task.startedAt}
          mdiIcon="mdi-progress-clock"
          date={task.startedAt || ''}
          textPending={'Task is in progress'}
          textDone={'Task is in progress'}
        />

        <ProgressInfoConnector done={!!task.finishedAt} />
        <ProgressInfo
          done={!!task.finishedAt}
          mdiIcon="mdi-check"
          date={task.finishedAt || ''}
          textPending={'Work is done '}
          textDone={'Work is done'}
        />
      </div>
    )
  }

  // if (errors.length > 0)
  //   return (
  //     <ShellPublic>
  //       <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
  //         <div className="container max-w-5xl mx-auto sm:p-8 p-4">
  //           <ul>
  //             {errors.map((error) => (
  //               <li>{error}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>
  //     </ShellPublic>
  //   )

  return <Shell>{content}</Shell>
}
