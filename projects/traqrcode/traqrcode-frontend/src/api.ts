import { BACKEND_URL } from '@hekori/traqrcode-common'
import { environment } from './environments/environment'
import { API_CODE, ResponseBase } from '@hekori/traqrcode-common'

export class Api {
  redirectToHome() {
    window.location.href = '/'
  }

  logout() {
    localStorage.removeItem(environment.getIdTokenLocalStorageKey())

  }

  checkLoggedIn(response: ResponseBase) {
    if (response.status === API_CODE.ERROR_INVALID_ACCESS_TOKEN) {
      this.logout()
      this.redirectToHome()
      return false
    }
    return true
  }

  async get(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getIdTokenLocalStorageKey()
        )}`,
      },
    })
    const returnValue = await response.json()
    this.checkLoggedIn(returnValue)
    return returnValue
  }

  async getBlob(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'get',
      headers: {
        'Content-type': 'application/pdf',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getIdTokenLocalStorageKey()
        )}`,
      },
    })
    return await response.arrayBuffer()
  }

  async post<ReturnType, BodyType>(url: string, json: BodyType) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getIdTokenLocalStorageKey()
        )}`,
      },
      body: JSON.stringify(json),
    })
    const returnValue = await response.json()
    this.checkLoggedIn(returnValue)
    return returnValue as Promise<ReturnType>
  }

  async delete(url: string) {
    const response = await fetch(BACKEND_URL + url, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem(
          environment.getIdTokenLocalStorageKey()
        )}`,
      },
    })
    const returnValue = await response.json()
    this.checkLoggedIn(returnValue)
    return returnValue
  }
}
