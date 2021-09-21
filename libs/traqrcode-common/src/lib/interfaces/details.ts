import { GetResponseBase } from './api'

export interface DetailsDatabaseResponse {
  pageUuid: string
  pageItemProgressUuid: string
  pageTitle: string
  pageItemUuid: string
  pageItemTitle: string
  pageItemSubTitle: string
  pageItemProgressCreatedAt: string
  pageItemProgressStartedAt: string
  pageItemProgressFinishedAt: string
  pageWorkerUuid: string
  pageWorkerEmail: string
}

export interface GetDetailsResponse extends GetResponseBase {
  ids: string[]
  idToItem: Record<string, DetailsDatabaseResponse>
}
