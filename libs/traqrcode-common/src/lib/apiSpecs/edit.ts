import {
  KeyToStringArray,
  Page,
  PageItem,
  PageItemInitializer,
  PageWorker,
  PostResponseBase,
} from '@hekori/traqrcode-common'

export interface PageEditState {
  pageUuid: string
  title: string
  pageItemUuids: string[]
  uuidToPageItem: Record<string, PageItemInitializer>
  pageWorkerUuids: string[]
  uuidToPageWorker: Record<string, string>
}

export interface PostEditRequest {}

export interface PostEditResponse extends PostResponseBase {
  // pageUuid: string
}

export interface GetEditResponse {
  page: Page
  pageItems: PageItem[]
  pageWorker: PageWorker[]
}

export interface PageEditErrors {
  count: number
  global: string[]
  idToWorker: KeyToStringArray
  idToItem: KeyToStringArray
}
