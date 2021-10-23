import * as React from 'react'

export const ChangeIndicatorPill: React.FC<{ percentage: number }> = ({
  percentage,
}) => {
  const arrowUp = <i className="mdi mdi-arrow-top-right-thick mr-2" />
  const arrowDown = <i className="mdi mdi-arrow-bottom-right-thick mr-2" />

  const arrowRight = <i className="mdi mdi-arrow-right-bold mr-2" />

  if (percentage <= -1) {
    return (
      <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
        {arrowDown}
        <span className="sr-only">Decreased by</span>
        {percentage}%
      </div>
    )
  } else if (percentage >= 1) {
    return (
      <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
        {arrowUp}
        <span className="sr-only">Increased by</span>
        {percentage}%
      </div>
    )
  } else {
    return (
      <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 md:mt-2 lg:mt-0">
        {arrowRight}
        <span className="sr-only">No change</span>
        0%
      </div>
    )
  }
}
