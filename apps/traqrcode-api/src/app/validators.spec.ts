import { isValidUuid } from './validators'

describe('isValidUuid', () => {
  it('returns true for valid uuids', () => {
    expect(isValidUuid('db4fe87f-4157-43ed-b393-53600a67efe0')).toBe(true)
  })

  it('returns false for invalid uuids', () => {
    expect(isValidUuid('db4fe87f-4157-43ed-b393-53600a67efes')).toBe(false)
    expect(isValidUuid('db4fe87f-4157-43ed-b393-53600a67efe0-a')).toBe(false)
  })
})
