import { PostResponseBase } from './api'

export interface PostCreateRequest {}

export interface PostCreateResponse extends PostResponseBase {
  pageUuid: string
}
