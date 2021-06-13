import { environment } from './environments/environment'

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(environment.getAccessTokenLocalStorageKey())
}

export const logout = () => {
  localStorage.removeItem(environment.getAccessTokenLocalStorageKey())
}
