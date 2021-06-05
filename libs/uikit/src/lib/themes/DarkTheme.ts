import { Theme } from './types'
import { LightTheme } from './LightTheme'

export const DarkTheme: Theme = {
  ...LightTheme,
  document: '#031227',
  document2: '#141f30',
  document3: '#325286',
  onDocument: '#FFFFFF',
  onDocument2: '#CCCCCC',
  onDocument3: '#7f92ad',
  onDocumentHighlight: '#00b7ff',
  button: '#ff8e00',
  buttonHover: '#ffba65',
  button2: '#00c4ff',
  button2Hover: '#68dcff',
  onButton: '#ffffff',
  input: '#031227',
  inputBorder: '#CCCCCC44',
  onInput: '#e8e8e8',
  onMain: '#dedede',
  main: '#323232',
  onCard: '#FFFFFF',
  card: '#323232',
  divider: '#CCCCCC44',
  touchableHighlight: '#FFFFFF11',
}
