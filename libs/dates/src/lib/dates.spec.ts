import { getDate, isoDatetimeFormatter } from './dates'

describe('isoDatetimeFormatter', () => {
  it('should correctly return an iso datetime string', () => {
    const expected = '2020-01-01T01:00:00Z'
    const now = getDate(expected)
    const s = isoDatetimeFormatter(now)
    expect(s).toEqual(expected)
  })
})
