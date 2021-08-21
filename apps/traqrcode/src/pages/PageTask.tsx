import * as React from 'react'
import { useGlobal } from '../index.provider'
import { ShellPublic } from '../components/ShellPublic'
import {
  dateFormatter,
  MyDate,
  shortDayNameFormatter,
  timeFormatter,
} from '@hekori/dates'
import { TaskRouteInfo } from '../routings'
import { useQuery } from 'react-query'
import { GetTaskResponseOk } from '../../../../libs/traqrcode-common/src/lib/interfaces/task'
import { Loading } from '../components/Loading'

type PropsPageTask = {
  routeInfo: TaskRouteInfo
}

interface ProgressInfoProps {
  date: MyDate
  textPending: string
  textDone: string
  mdiIcon: string
  done: boolean
}

const ProgressInfo: React.FC<ProgressInfoProps> = ({
  date,
  textPending,
  textDone,
  mdiIcon,
  done,
}) => {
  return (
    <div
      className={`flex flex-row items-start h-16 ${done ? '' : 'opacity-20'}`}
    >
      <div
        className={`${
          done ? 'bg-green-500' : 'bg-gray-400'
        } rounded-full flex w-16 h-16 items-center justify-center`}
      >
        <i className={`mdi ${mdiIcon} text-white text-3xl`} />
      </div>

      <div className="flex-1 pl-4">
        <div className="text-lg">
          {done
            ? `${shortDayNameFormatter(date)} ${dateFormatter(
                date
              )} ${timeFormatter(date)}`
            : '...'}
        </div>
        <div className="text-md">{done ? textDone : textPending}</div>
      </div>
    </div>
  )
}

const ProgressInfoConnector: React.FC<{ done: boolean }> = ({ done }) => {
  return (
    <div className={`flex flex-row ${done ? '' : 'opacity-20'} mt-4 mb-4`}>
      <div className="h-10 w-16 flex flex-row justify-center">
        <div
          className={`h-10 w-1 rounded-full ${
            done ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      </div>
    </div>
  )
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

  return <ShellPublic>{content}</ShellPublic>
}
