export interface ParseEHLO {
  domain: string
}

export interface ParseMAIL {
  email: string
}

// response codes as defined on https://datatracker.ietf.org/doc/html/rfc2821#section-4.2.2
export const response220ServiceReady = '220 service ready'
export const response250Ok = '250 OK'
export const response354StartMailInput = '354 start mail input'
export const response500UnknownCommand =
  '500 Syntax error, command unrecognized'
export const response501SyntaxError =
  '501 Syntax error in parameters or arguments'
export const response502ComandNotImplemented = '502 Command not implemented'
export const response503BadSequenceOfCommands = '503 Bad sequence of commands'
export const response221ClosingChannel =
  '221 <domain> Service closing transmission channel'
export const extractCommand = (line: string) => {
  return line.toUpperCase().slice(0, 4)
}

export const extractCommandArguments = (line: string) => {
  return line.slice(5)
}

export const parseEHLO = (line: string): ParseEHLO => {
  return { domain: extractCommandArguments(line) }
}

export const parseMAILFROM = (line: string): ParseMAIL => {
  return { email: line.slice(10) }
}

export const validateDomain = (domain: string): boolean => {
  if (domain.length == 0) return false
  return true
}

export const deleteAllObjectAttributes = (object: Object) => {
  for (const key of Object.keys(object)) {
    delete object[key]
  }
  return object
}
