import { GetResponseBase } from './api'

export interface NumberByStatus {
  numberOfOpenTasks: number
  numberOfInProgressTasks: number
  numberOfFinishedTasks: number
}

export type TimeCount = { time: number; count: number }

export interface GetDashboardResponse extends GetResponseBase, NumberByStatus {
  openToInProgressTimingHistogram: TimeCount[]
}
