export interface PostResponseBase {
  status: string
}

export interface PostResponseError extends PostResponseBase {
  errors?: string[]
}
