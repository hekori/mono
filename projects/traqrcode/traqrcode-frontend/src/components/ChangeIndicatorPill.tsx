import * as React from 'react'
import {
  mdiArrowBottomRightThick,
  mdiArrowRightThick,
  mdiArrowTopRightThick,
} from '@mdi/js'
import Icon from '@mdi/react'

export const ChangeIndicatorPill: React.FC<{ percentage: number }> = ({
  percentage,
}) => {
  const arrowUp = (
    <Icon path={mdiArrowTopRightThick} className="mr-2 h-4 mr-2" />
  )
  const arrowDown = (
    <Icon path={mdiArrowBottomRightThick} className="mr-2 h-4 mr-2" />
  )
  const arrowRight = <Icon path={mdiArrowRightThick} className="mr-2 h-4" />

  if (percentage <= -1) {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
        {arrowDown}
        <span className="sr-only">Decreased by</span>
        {percentage}%
      </div>
    )
  } else if (percentage >= 1) {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
        {arrowUp}
        <span className="sr-only">Increased by</span>
        {percentage}%
      </div>
    )
  } else {
    return (
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 md:mt-2 lg:mt-0">
        {arrowRight}
        <span className="sr-only">No change</span>
        0%
      </div>
    )
  }
}
