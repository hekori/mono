import {
  annotateDuration,
  CombinedPageProgress,
  sortByDuration,
} from './getDashboard'

describe('compareCombinedPageProgress', () => {
  it('should sort correctly', () => {
    const common: CombinedPageProgress = {
      createdBy: '',
      pageItemProgressUuid: '',
      pageItemUuid: '',
      pageUuid: '',
      subTitle: '',
      title: '',
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
        duration: 25200,
        finishedAt: '2021-10-10T17:00:00Z',
      },
      {
        ...common,
        duration: 28800,
        finishedAt: '2021-10-10T18:00:00Z',
      },
      {
        ...common,
        duration: 32400,
        finishedAt: '2021-10-10T19:00:00Z',
      },
      {
        ...common,
        duration: 36000,
        finishedAt: '2021-10-10T20:00:00Z',
      },
      {
        ...common,
        duration: Infinity,
        finishedAt: null,
      },
      {
        ...common,
        duration: Infinity,
        finishedAt: null,
      },
      {
        ...common,
        duration: Infinity,
        finishedAt: null,
      },
    ]

    const annotated = input.map(annotateDuration)
    const actual = annotated.sort(sortByDuration)
    expect(actual).toEqual(expected)
  })
})
