import { GetResponseBase } from './api'

export interface NumberByStatus {
  numberOfOpenTasks: number
  numberOfInProgressTasks: number
  numberOfFinishedTasks: number
  lastMonthNumberOfFinishedTasks: number
  lastMonthNumberOfInProgressTasks: number
  lastMonthNumberOfOpenTasks: number
}

export type TimeCount = { time: number; count: number }

export interface ComputePercentiles {
  atLeast50PercentFinishedWithin: number
  atLeast90PercentFinishedWithin: number
  atLeast99PercentFinishedWithin: number
}

export interface GetDashboardResponse extends GetResponseBase, NumberByStatus {
  percentiles: ComputePercentiles
  openToInProgressTimingHistogram: TimeCount[]
}
