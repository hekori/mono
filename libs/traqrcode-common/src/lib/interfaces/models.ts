export enum TaskStep {
  created = 0,
  notified = 1,
  inprogress = 2,
  done = 3,
}

export interface Task {
  id: string
  step: number
  createdAt: string
  notifiedAt?: string
  startedAt?: string
  doneAt?: string
  workerId?: string
}

export interface Item {
  id: string
  title: string
  subTitle: string
  taskIds: string[]
  idToTask: { [key: string]: Task }
}

export interface Req {
  test: boolean
  accessToken: string
  shortHash: string
  createdAt: string
  admin: string
  idToWorker: { [key: string]: string }
  workerIds: string[]
  idToItem: { [key: string]: Item }
  itemIds: string[]
}
