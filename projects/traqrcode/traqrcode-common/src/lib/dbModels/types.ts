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

// see https://openid.net/specs/openid-connect-core-1_0.html for naming convention
export interface OidcCredentials {
  oidcCredentialsUuid: string
  createdAt: string
  userUuid: string
  iss: string
  sub: string
}

export interface OidcCredentialsInitializer {
  oidcCredentialsUuid?: string
  createdAt?: string
  userUuid: string
  iss: string
  sub: string
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
  userUuid: string
  pageUuid: string
  createdAt: string
}

export interface PageWorkerInitializer {
  userUuid?: string
  pageUuid: string
  createdAt?: string
}

export interface PageItemProgress {
  pageItemProgressUuid: string
  pageItemUuid: string
  userUuid?: string
  createdAt?: string
  startedAt?: string
  finishedAt?: string
}

export interface PageItemProgressInitializer {
  pageItemProgressUuid: string
  pageItemUuid: string
  userUuid?: string
  createdAt?: string
  startedAt?: string
  finishedAt?: string
}
