import { createIdToken, verifyAccessToken } from './auth'

describe('jwt signing', () => {
  it('should verify correctly signed tokens', () => {
    const privateKey = 'veryprivatekey'
    const expected = { userUuid: 'test1234' }
    const accessToken = createIdToken(expected, privateKey)
    console.log(accessToken)
    const actual = verifyAccessToken(accessToken, privateKey)
    expect(actual.userUuid).toEqual(expected.userUuid)
  })
})
