import * as React from 'react'
import { useGlobal } from '../index.provider'
import { Container } from '../components/Container'
import { editRoute, DashboardRouteInfo } from '../routings'
import {
  API_CODE,
  BACKEND_URL,
  getBackendCreatePagePostUrl,
  getBackendDashboardGetUrl,
  getBackendListGetUrl,
  getBackendPageDeleteUrl,
  GetListResponse,
  PostCreateRequest,
  PostCreateResponse,
  to,
} from '@hekori/traqrcode-common'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ButtonFlat, TextLarge, TextSmall } from '@hekori/uikit'
import {
  DocumentDownloadIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import { dateFormatter, timeFormatter } from '@hekori/dates'
import { ShellLoggedIn } from '../components/ShellLoggedIn'
import { dl } from '../dl'
import { Card } from '../components/Card'
import { GetDashboardResponse } from '../../../../libs/traqrcode-common/src/lib/interfaces/dashboard'

interface PropsPageDashboard {
  routeInfo: DashboardRouteInfo
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
