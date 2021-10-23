export interface GetTaskResponseOk {
  status: 'OK'
  title: string
  subTitle: string
  createdAt: string
  startedAt: string
  finishedAt: string
}

export interface GetTaskResponseError {
  status: 'ERROR'
  errors: string[]
}

export type GetTaskResponse = GetTaskResponseOk | GetTaskResponseError

export const isGetTaskResponseOk = (
  response: GetTaskResponse
): response is GetTaskResponseOk => {
  return response.status === 'OK'
}

export const isGetTaskResponseError = (
  response: GetTaskResponse
): response is GetTaskResponseError => {
  return response.status === 'ERROR'
}
