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
  title: string
  subTitle: string
  createdBy: string
  createdAt: string
}

export interface PageInitializer {
  pageUuid: string
  createdBy: string
  createdAt?: string
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

export interface PageWorker {
  pageWorkerUuid: string
  email: string
  pageUuid: string
  createdAt: string
}

export interface PageWorkerInitializer {
  pageWorkerUuid?: string
  email: string
  pageUuid: string
  createdAt?: string
}
