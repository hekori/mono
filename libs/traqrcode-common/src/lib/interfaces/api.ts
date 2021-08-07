export interface ResponseBase {
  status: string
}

export interface GetResponseBase extends ResponseBase {}

export interface PostResponseBase {
  status: string
}

export interface PostResponseError extends PostResponseBase {
  errors?: string[]
}
