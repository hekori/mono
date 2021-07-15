import { PostResponseBase } from './api'

export interface PostLoginRequest extends PostResponseBase {
  accessToken: string
}

export interface PostLoginResponse extends PostResponseBase {}
