import { PostResponseBase } from './api'

export interface PostSignupRequest extends PostResponseBase {
  email: string
}

export interface PostSignupResponse extends PostResponseBase {
  email: string
  emailSentAt: string
}
