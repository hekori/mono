import { KeyToStringArray } from './generic'

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
}

export interface PostResponseError extends PostResponseBase {
  errors?: string[]
}

export interface PostSignupRequest extends PostResponseBase {
  email: string
}

export interface PostSignupResponse extends PostResponseBase {
  email: string
  emailSentAt: string
}

export interface PostCreateRequest {}

export interface PostCreateResponse extends PostResponseBase {
  pageUuid: string
}

export interface PostEditRequest {}

export interface PostEditResponse extends PostResponseBase {
  // pageUuid: string
}

export interface PostLoginRequest extends PostResponseBase {
  accessToken: string
}

export interface PostLoginResponse extends PostResponseBase {}
