import * as React from 'react'
import {
  dateFormatter,
  getNow,
  humanReadableTimeDifference,
  MyDate,
  shortDayNameFormatter,
  timeFormatter,
} from '@hekori/dates'
import { classNames } from '@hekori/uikit'

export interface ProgressInfoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: MyDate
  textPending: string
  textDone: string
  mdiIcon: string
  done: boolean
}

export const ProgressInfo: React.FC<ProgressInfoProps> = ({
  date,
  textPending,
  textDone,
  mdiIcon,
  done,
  ...props
}) => {
  return (
    <div
      className={classNames(
        `flex flex-row items-start text-left ${done ? '' : 'opacity-20'}`,
        props.className
      )}
    >
      <div
        className={`${
          done ? 'bg-green-500' : 'bg-gray-400'
        } rounded-full flex w-16 h-16 items-center justify-center`}
      >
        <i className={`mdi ${mdiIcon} text-white text-3xl`} />
      </div>

      <div className="flex-1 pl-4 overflow-hidden">
        <div className="text-lg">
          {done ? `${humanReadableTimeDifference(date, getNow())} ago` : '...'}
        </div>
        <div className="text-md">{done ? textDone : textPending}</div>
      </div>
    </div>
  )
}
export const ProgressInfoConnector: React.FC<{ done: boolean }> = ({
  done,
}) => {
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
