import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { DashboardRouteInfo } from '../routings'
import {
  getBackendDashboardGetUrl,
  GetDashboardResponse,
  TimeCount,
} from '@hekori/traqrcode-common'
import { useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { Card } from '../components/Card'
import { ReactElement } from 'react'

interface PropsPageDashboard {
  routeInfo: DashboardRouteInfo
}

const Histogram: React.FC<{
  data: TimeCount[] | undefined
}> = ({ data }) => {
  if (!data) return <></>

  const result = []

  for (const item of data) {
    result.push(
      <div key={item.time}>
        {item.time} {item.count}
      </div>
    )
  }
  return <>{result}</>
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
        <div className="grid grid-cols-3 gap-4 text-3xl">
          <Card>
            <i className={`mdi mdi-email`} />
            Open tasks: {data?.numberOfOpenTasks}
            <br />
            <Histogram data={data?.openToInProgressTimingHistogram} />
          </Card>
          <Card>
            <i className={`mdi mdi-progress-clock`} />
            In progress tasks: {data?.numberOfInProgressTasks}
          </Card>
          <Card>
            <i className={`mdi mdi-progress-check`} />
            Finished tasks: {data?.numberOfFinishedTasks}
          </Card>
        </div>
      </Container>
    </ShellLoggedIn>
  )
}
