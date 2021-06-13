import { BACKEND_URL } from '../../../libs/traqrcode-common/src/lib/settings'
import { environment } from './environments/environment'

export class Api {
  async get(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getAccessTokenLocalStorageKey()
        )}`,
      },
    })
    return response.json()
  }

  async getBlob(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'application/pdf',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getAccessTokenLocalStorageKey()
        )}`,
      },
    })
    return await response.arrayBuffer()
  }

  async post(url: string, json: object) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getAccessTokenLocalStorageKey()
        )}`,
      },
      body: JSON.stringify(json),
    })
    return response.json()
  }
}
