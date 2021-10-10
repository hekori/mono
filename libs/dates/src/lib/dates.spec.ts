import {
  getDate,
  isoDateFormatter,
  isoDatetimeFormatter,
  timeDifference,
} from './dates'

describe('isoDatetimeFormatter', () => {
  it('should correctly return an iso datetime string', () => {
    const expected = '2020-01-01T01:00:00Z'
    const now = getDate(expected)
    const s = isoDatetimeFormatter(now)
    expect(s).toEqual(expected)
  })
})

describe('timeDifference', () => {
  it('should work for strings', () => {
    const start = '2020-02-10T12:00:00Z'
    const end = '2020-02-10T12:00:01Z'
    const difference = timeDifference(start, end, 'seconds')
    expect(difference).toBeCloseTo(1)
  })

  it('should work for strings with negative time difference', () => {
    const start = '2020-02-10T12:00:00Z'
    const end = '2020-02-10T12:00:01Z'
    const difference = timeDifference(end, start, 'seconds')
    expect(difference).toBeCloseTo(-1)
  })

  it('should work for undefined start', () => {
    const start = undefined
    const end = '2020-02-10T12:00:01Z'
    const difference = timeDifference(start, end, 'seconds')
    expect(difference).toEqual(NaN)
  })
})
