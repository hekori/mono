import {
  deleteAllObjectAttributes,
  extractCommand,
  extractCommandArguments,
  ParseEHLO,
  parseEHLO,
  ParseMAIL,
  parseMAILFROM,
} from './smtpCommands'

describe('extractCommand', () => {
  it('should return the correct command', () => {
    const input = 'MAIL FROM: <test@localhost>'
    const output = extractCommand(input)
    const expected = 'MAIL'
    expect(output).toEqual(expected)
  })

  it('should return the correct command upper case', () => {
    const input = 'mail FROM: <test@localhost>'
    const output = extractCommand(input)
    const expected = 'MAIL'
    expect(output).toEqual(expected)
  })
})

describe('extractCommandArguments', () => {
  it('should return the correct command arguments', () => {
    const input = 'MAIL FROM: <test@localhost>'
    const output = extractCommandArguments(input)
    const expected = 'FROM: <test@localhost>'
    expect(output).toEqual(expected)
  })
})

describe('parseEHLO', () => {
  it('should return the correct command arguments', () => {
    const input = 'EHLO mail.traqrcode.com'
    const output = parseEHLO(input)
    const expected: ParseEHLO = { domain: 'mail.traqrcode.com' }
    expect(output).toEqual(expected)
  })
})

describe('parseMAIL', () => {
  it('should return the correct command arguments', () => {
    const input = 'MAIL FROM:<sender@example.org>'
    const output = parseMAILFROM(input)
    const expected: ParseMAIL = { email: '<sender@example.org>' }
    expect(output).toEqual(expected)
  })
})

describe('deleteAllObjectAttributes', () => {
  it('should object without any attributes', () => {
    const input = { a: 'b', c: 'd' }
    const output = deleteAllObjectAttributes(input)
    const expected = {}

    expect(output).toEqual(expected)
  })
})
