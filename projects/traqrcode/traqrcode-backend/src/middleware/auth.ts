import { FRONTEND_URL, JWT_PRIVATE_KEY } from '../settings'
import { FastifyRequest } from 'fastify'
import { AuthenticationError } from '../endpoints/errors'
import jwt = require('jsonwebtoken')

export const createIdToken = (
  {
    userUuid,
  }: {
    userUuid: string
  },
  privateKey = JWT_PRIVATE_KEY
): string => {
  return jwt.sign({ userUuid }, privateKey, {
    expiresIn: 90 * 24 * 60 * 60,
  })
}
export const getAccessTokenFromRequest = (request: FastifyRequest) => {
  return request.headers?.authorization.replace('Bearer ', '')
}
export const verifyAccessToken = (
  accessToken: string,
  privateKey = JWT_PRIVATE_KEY
): { userUuid: string } => {
  try {
    const s = jwt.verify(accessToken, privateKey) as { userUuid: string }
    console.log(s)
    return s
  } catch (e) {
    console.error(e)
    console.error('throwing AuthenticationError')
    throw new AuthenticationError()
  }
}
export const getLoginUrlForAccessToken = (accessToken: string): string => {
  return `${FRONTEND_URL}/login/${accessToken}`
}
