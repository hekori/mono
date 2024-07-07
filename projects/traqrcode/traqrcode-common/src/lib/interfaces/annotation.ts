import { PostResponseBase } from './api'

export interface PostAnnotationRequest {
    pageItemUuid: string
    annotation: string
}

export interface PostAnnotationResponse extends PostResponseBase {
}
