import { outbound } from './outbound'

describe('mail', () => {
  it('should work', () => {
    expect(outbound()).toEqual('mail')
  })
})
