import * as React from 'react'
import { useEffect, useState } from 'react'
import { ContextState } from '../index.provider'
import { ShellPublic } from '../components/ShellPublic'
import { api } from '../api'
import { Task } from '../../../../libs/traqrcode-common/src/lib/interfaces/models'
import {
  dateFormatter,
  MyDate,
  shortDayNameFormatter,
  timeFormatter,
} from '@hekori/dates'
import { to } from '../../../../libs/traqrcode-common/src/lib/misc'
import { TaskRouteInfo } from '../routings'

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
  const { state } = React.useContext(ContextState)

  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [task, setTask] = useState<
    Task & { itemTitle?: string; itemSubtitle?: string }
  >({
    itemTitle: '',
    itemSubtitle: '',
    id: '',
    step: 0,
    createdAt: '',
    notifiedAt: '',
    startedAt: '',
    doneAt: '',
  })

  useEffect(() => {
    const t = async () => {
      setLoading(true)
      const [err, res] = await to(
        api.get(
          `/task/${routeInfo.shortHash}/${routeInfo.itemId}/${routeInfo.taskId}`
        )
      )
      setLoading(false)

      if (err) {
        console.log(err, res)
        setErrors(['SOME_ERROR'])
        return
      }

      if (res.status === 'OK') {
        setTask(res.task as Task)
      } else if (res.status === 'ERROR') {
        setErrors(res.errors)
      }
    }
    void t()
  }, [])

  console.log(state)

  if (loading)
    return (
      <ShellPublic>
        <div className="spinner" />
      </ShellPublic>
    )

  if (errors.length > 0)
    return (
      <ShellPublic>
        <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
          <div className="container max-w-5xl mx-auto sm:p-8 p-4">
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </ShellPublic>
    )

  return (
    <ShellPublic>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto sm:p-8 p-4">
          {/*<div className="flex flex-1 flex-col sm:p-8 p-4">*/}
          <ProgressInfo
            done={task.step >= 1}
            mdiIcon="mdi-email"
            date={task.notifiedAt || ''}
            textPending={'Waiting ...'}
            textDone={`Request for "${task.itemTitle}" ${
              task.itemSubtitle ? `"${task.itemSubtitle}"` : ''
            } has been received`}
          />
          <ProgressInfoConnector done={task.step >= 2} />
          <ProgressInfo
            done={task.step >= 2}
            mdiIcon="mdi-progress-clock"
            date={task.startedAt || ''}
            textPending={'Task is in progress'}
            textDone={'Task is in progress'}
          />

          <ProgressInfoConnector done={task.step >= 3} />
          <ProgressInfo
            done={task.step >= 3}
            mdiIcon="mdi-check"
            date={task.doneAt || ''}
            textPending={'Work is done '}
            textDone={'Work is done'}
          />
        </div>
      </div>
    </ShellPublic>
  )
}
