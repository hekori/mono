export interface PostAnnotationRequest {
    pageItemUuid: string
    annotation: string
}

export interface PostAnnotationResponseOk {
    status: 'OK'
    pageItemProgressUuid: string
}

export interface PostAnnotationResponseError {
    status: 'ERROR'
    errors: string[]
}

export type PostAnnotationResponse = PostAnnotationResponseOk | PostAnnotationResponseError

export const isPostAnnotationResponseOk = (
    response: PostAnnotationResponse
): response is PostAnnotationResponseOk => {
    return response.status === 'OK'
}

export const isPostAnnotationResponseError = (
    response: PostAnnotationResponse
): response is PostAnnotationResponseError => {
    return response.status === 'ERROR'
}
