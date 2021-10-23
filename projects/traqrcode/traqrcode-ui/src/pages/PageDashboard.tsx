import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { DashboardRouteInfo } from '../routings'
import {
  getBackendDashboardGetUrl,
  GetDashboardResponse,
} from '@hekori/traqrcode-common'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { TextNormal } from '@hekori/uikit'
import { ChangeIndicatorPill } from '../components/ChangeIndicatorPill'

interface PropsPageDashboard {
  routeInfo: DashboardRouteInfo
}

const computePercentage = (
  currentValue: number | undefined,
  previousValue: number | undefined
) => {
  if (currentValue === 0) return 0
  if (previousValue === 0) return 100
  return ((currentValue ?? 0) - (previousValue ?? 0)) / (currentValue || 1)
}

export const PageDashboard: React.FC<PropsPageDashboard> = ({ routeInfo }) => {
  const { api } = useGlobal()
  const history = useHistory()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery<GetDashboardResponse>(
    'dashboard',
    async () => {
      return api.get(getBackendDashboardGetUrl())
    }
  )

  console.log('isLoading', isLoading)

  return (
    <ShellLoggedIn loading={isLoading}>
      <Container>
        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-document2 overflow-hidden shadow divide-y divide-inputBorder md:grid-cols-3 md:divide-y-0 md:divide-x">
          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">Finished tasks</TextNormal>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.numberOfFinishedTasks}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {data?.lastMonthNumberOfFinishedTasks} last month
                </span>
              </div>
              <ChangeIndicatorPill
                percentage={computePercentage(
                  data?.numberOfFinishedTasks,
                  data?.lastMonthNumberOfFinishedTasks
                )}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">
              Number of in Progress Tasks
            </TextNormal>

            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.numberOfInProgressTasks}

                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {data?.lastMonthNumberOfInProgressTasks} last month
                </span>
              </div>
              <ChangeIndicatorPill
                percentage={computePercentage(
                  data?.numberOfInProgressTasks,
                  data?.lastMonthNumberOfInProgressTasks
                )}
              />
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">
              Number of open tasks
            </TextNormal>

            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.numberOfOpenTasks}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from {data?.lastMonthNumberOfOpenTasks} last month
                </span>
              </div>

              <ChangeIndicatorPill
                percentage={computePercentage(
                  data?.numberOfOpenTasks,
                  data?.lastMonthNumberOfOpenTasks
                )}
              />
            </dd>
          </div>
        </dl>

        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-document2 overflow-hidden shadow divide-y divide-inputBorder md:grid-cols-3 md:divide-y-0 md:divide-x">
          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">
              50% of the tasks were finished in
            </TextNormal>
            <dd className="mt-1 flex justify-start items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.percentiles.atLeast50PercentFinishedWithin ?? 'n/a'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {data?.percentiles.atLeast50PercentFinishedWithin !== undefined
                  ? 'minutes'
                  : 'not enough data'}
              </span>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">
              90% of the tasks were finished in
            </TextNormal>
            <dd className="mt-1 flex justify-start items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.percentiles.atLeast90PercentFinishedWithin ?? 'n/a'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {data?.percentiles.atLeast90PercentFinishedWithin !== undefined
                  ? 'minutes'
                  : 'not enough data yet'}
              </span>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <TextNormal className="text-onDocument2">
              99% of the tasks were finished in
            </TextNormal>
            <dd className="mt-1 flex justify-start items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-onDocumentHighlight">
                {data?.percentiles.atLeast99PercentFinishedWithin ?? 'n/a'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {data?.percentiles.atLeast99PercentFinishedWithin !== undefined
                  ? 'minutes'
                  : 'not enough data yet'}
              </span>
            </dd>
          </div>
        </dl>
      </Container>
    </ShellLoggedIn>
  )
}
