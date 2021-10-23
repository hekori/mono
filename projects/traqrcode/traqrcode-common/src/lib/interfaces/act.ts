export interface GetActResponseOk {
  status: 'OK'
}

export interface GetActResponseError {
  status: 'ERROR'
  errors: string[]
}

export type GetActResponse = GetActResponseOk | GetActResponseError

export const isGetActResponseOk = (
  response: GetActResponse
): response is GetActResponseOk => {
  return response.status === 'OK'
}

export const isGetActResponseError = (
  response: GetActResponse
): response is GetActResponseError => {
  return response.status === 'ERROR'
}
