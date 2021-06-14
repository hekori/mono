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
