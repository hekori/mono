import { GetResponseBase } from './api'

export interface GetDashboardResponse extends GetResponseBase {
  numberOfOpenTasks: number
  numberOfInProgressTasks: number
  numberOfFinishedTasks: number
}
