import { KeyToStringArray } from './generic'
import { API_CODE } from '../constants'

export interface PageEditErrors {
  count: number
  global: string[]
  idToWorker: KeyToStringArray
  idToItem: KeyToStringArray
}

export const InitialPageEditErrors: PageEditErrors = {
  count: 0,
  idToWorker: {},
  idToItem: {},
  global: [],
}

export interface PostResponseBase {
  status: string
  errors?: string[]
}

export interface PostCreateRequest {
  test: boolean
}

export interface PostCreateResponse extends PostResponseBase {}

export interface PostLoginRequest extends PostResponseBase {
  accessToken: string
}

export interface PostLoginResponse extends PostResponseBase {
  email: string
  emailSentAt: string
}
