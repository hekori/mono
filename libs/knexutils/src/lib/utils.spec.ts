import { formatFileSystemSaveISO } from './utils'

describe('formatFileSystemSaveISO', () => {
  it('should output the correct format', () => {
    const datetime = '2020-10-24T14:54:37Z'
    console.log(datetime)
    const expected = '2020-10-24T14-54-37Z'
    const actual = formatFileSystemSaveISO(datetime)
    expect(actual).toEqual(expected)
  })
})
