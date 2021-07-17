import {
  KeyToStringArray,
  Page,
  PageItem,
  PageItemInitializer,
  PageWorker,
  PageWorkerInitializer,
  PostResponseBase,
} from '@hekori/traqrcode-common'

export interface PostEditRequest {}

export interface PostEditResponse extends PostResponseBase {
  // pageUuid: string
}

export interface PageEditState {
  pageUuid: string
  title: string
  pageItemUuids: string[]
  uuidToPageItem: Record<string, Omit<PageItemInitializer, 'pageUuid'>>
  pageWorkerUuids: string[]
  uuidToPageWorker: Record<string, Omit<PageWorkerInitializer, 'pageUuid'>>
}

export interface GetEditResponse extends PageEditState {}

export interface PageEditErrors {
  count: number
  global: string[]
  idToWorker: KeyToStringArray
  idToItem: KeyToStringArray
}
