import {
  existsReq,
  getReqPathsWithinRange,
  getUnusedShortHash,
  readReq,
  removeReq,
  writeReq,
} from '../core'
import { getDate, Req } from '@hekori/traqrcode-common'
import { STORE_DIR } from '../settings'

describe('getUnusedShortHash', () => {
  it('should get some hash', () => {
    const shortHash = getUnusedShortHash()
    expect(shortHash.length).toBe('20200414_02aff0ca-89c52b52'.length)
    expect(shortHash.includes('_')).toBe(true)
    expect(shortHash.includes('-')).toBe(true)
  })
})

describe('writeReq and readReq', () => {
  it('should writeReq, readReq, removeReq correctly', () => {
    console.log('STORE_DIR', STORE_DIR)
    const shortHash = getUnusedShortHash()

    const expected: Req = {
      admin: 'dl',
      createdAt: getDate().toISOString(),
    } as Req
    writeReq(shortHash, expected)
    expect(existsReq(shortHash)).toBe(true)

    const past = getDate().add(-1, 'days')
    const future = past.clone().add(2, 'days')
    const fileList = getReqPathsWithinRange(past, future)
    console.log('fileList', fileList)

    const actual = readReq(shortHash)
    expect(actual).toEqual(expected)
    removeReq(shortHash)
    expect(existsReq(shortHash)).toBe(false)
  })
})
