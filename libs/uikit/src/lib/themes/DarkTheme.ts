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
  button: '#ff7700',
  buttonHover: '#ffba65',
  buttonDisabled:'#b79778',
  button2: '#00c4ff',
  button2Hover: '#68dcff',
  button2Disabled: '#77a8b7',
  onButton: '#ffffff',
  input: '#031227',
  inputBorder: '#7f868d',
  onInput: '#e8e8e8',
  onMain: '#dedede',
  main: '#323232',
  onCard: '#FFFFFF',
  card: '#323232',
  divider: '#CCCCCC44',
  touchableHighlight: '#FFFFFF11',
}
