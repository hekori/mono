export interface User {
  userUuid: string
  createdAt: string
  email: string
}

export interface UserInitializer {
  userUuid?: string
  createdAt?: string
  email: string
}

export interface Page {
  pageUuid: string
  createdBy: string
  createdAt: string
  isTest: boolean
  shortHash: string
}

export interface PageInitializer {
  pageUuid: string
  createdBy: string
  createdAt?: string
  isTest?: boolean
  shortHash: string
}

export interface PageItem {
  pageItemUuid: string
  pageUuid: string
  createdAt: string
  title: string
  subTitle: string
}

export interface PageItemInitializer {
  pageItemUuid?: string
  pageUuid: string
  createdAt?: string
  title: string
  subTitle: string
}

export interface m2mPageUser {
  userUuid: string
  pageUuid: string
  createdAt: string
}
