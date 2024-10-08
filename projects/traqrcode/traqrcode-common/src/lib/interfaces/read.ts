import {PageItem} from "../dbModels/types";

export interface GetReadResponseOk {
  status: 'OK'
  pageItem: PageItem
}

export interface GetReadResponseError {
  status: 'ERROR'
  errors: string[]
}

export type GetReadResponse = GetReadResponseOk | GetReadResponseError

export const isGetReadResponseOk = (
  response: GetReadResponse
): response is GetReadResponseOk => {
  return response.status === 'OK'
}

export const isGetReadResponseError = (
  response: GetReadResponse
): response is GetReadResponseError => {
  return response.status === 'ERROR'
}
