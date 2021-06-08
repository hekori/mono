import { BACKEND_URL } from '../../../libs/traqrcode-common/src/lib/settings'

class Api {
  async get(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'text/plain; charset=UTF-8',
      },
    })
    return response.json()
  }

  async getBlob(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'application/pdf',
      },
    })
    return await response.arrayBuffer()
  }

  async post(url: string, json: object) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'post',
      headers: {
        'Content-type': 'text/plain; charset=UTF-8',
      },
      body: JSON.stringify(json),
    })
    return response.json()
  }
}

export const api = new Api()
