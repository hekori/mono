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

export interface PostCreateRequest {
  test: boolean
  admin: string
}
