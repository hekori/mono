import { compareCombinedPageProgress } from './getDashboard'

describe('compareCombinedPageProgress', () => {
  it('should sort correctly', () => {
    const common = {
      createdAt: '2021-10-10T10:00:00Z',
    }
    const input = [
      {
        ...common,
        finishedAt: '2021-10-10T18:00:00Z',
      },
      {
        ...common,
        finishedAt: null,
      },
      {
        ...common,
        finishedAt: '2021-10-10T17:00:00Z',
      },
      {
        ...common,
        finishedAt: null,
      },
      {
        ...common,
        finishedAt: '2021-10-10T19:00:00Z',
      },
      {
        ...common,
        finishedAt: null,
      },
      {
        ...common,
        finishedAt: '2021-10-10T20:00:00Z',
      },
    ]

    const expected = [
      {
        ...common,
        finishedAt: '2021-10-10T17:00:00Z',
      },
      {
        ...common,
        finishedAt: '2021-10-10T18:00:00Z',
      },
      {
        ...common,
        finishedAt: '2021-10-10T19:00:00Z',
      },
      {
        ...common,
        finishedAt: '2021-10-10T20:00:00Z',
      },
      {
        ...common,
        finishedAt: null,
      },
      {
        ...common,
        finishedAt: null,
      },
      {
        ...common,
        finishedAt: null,
      },
    ]

    const actual = [...input].sort(compareCombinedPageProgress)
    expect(actual).toEqual(expected)
  })
})
