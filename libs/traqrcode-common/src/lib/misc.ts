import { v4 as uuidv4 } from 'uuid'

export const to = (promise: Promise<any>) =>
  promise.then((data) => [null, data]).catch((err) => [err])

// FIXME: why is window.orgin used here? this will only work in the browser
export const getItemUrl = (pageItemUuid: string) => {
  return `${window.origin}/read/${pageItemUuid}`
}

export const getUuid = () => {
  return uuidv4()
}

export const shortuuid = () => {
  return uuidv4().split('-')[0]
}
