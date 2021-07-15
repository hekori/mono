import { PostResponseBase } from './api'
import { Page } from '../dbModels/types'

export interface GetListResponse extends PostResponseBase {
  ids: string[]
  idToItem: Record<string, Page>
}
