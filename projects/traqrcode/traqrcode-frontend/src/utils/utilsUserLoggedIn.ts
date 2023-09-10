import { environment } from '../environments/environment'
import jwt_decode from 'jwt-decode'

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(environment.getIdTokenLocalStorageKey())
}

export const logout = () => {
  localStorage.removeItem(environment.getIdTokenLocalStorageKey())
}

export const getLoggedInUserUuid = (): string => {
  const jwtToken = localStorage.getItem(
    environment.getIdTokenLocalStorageKey()
  )
  if (!jwtToken) return ''
  const decoded = jwt_decode(jwtToken) as { userUuid: string }
  return decoded.userUuid
}
