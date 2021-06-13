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

export interface PostCreateRequest {
  test: boolean
  admin: string
}

export interface PostResponseBase {
  status: string
  errors?: string[]
}

export interface PostCreateResponse extends PostResponseBase {
  email: string
  emailSentAt: string
}

export interface PostLoginRequest extends PostResponseBase {
  accessToken: string
}
