import {
  KeyToStringArray,
  Page,
  PageItem,
  PageItemInitializer,
  PageWorker,
  PageWorkerInitializer,
  PostResponseBase,
} from '@hekori/traqrcode-common'

export interface PostEditRequest extends PageEditState {}

export interface PostEditResponse extends PostResponseBase {
  // pageUuid: string
}

export interface PageEditState {
  pageUuid: string
  title: string
  pageItemUuids: string[]
  uuidToPageItem: Record<string, Omit<PageItemInitializer, 'pageUuid'>>
  emails: string[]
}

export interface GetEditResponse extends PageEditState {}

export interface PageEditErrors {
  count: number
  global: string[]
  field: Record<string, string[]>
}
