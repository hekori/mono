import { Theme } from './types'
import { LightTheme } from './LightTheme'

export const DarkTheme: Theme = {
  ...LightTheme,
  document: '#090c11',
  onDocument: '#FFFFFF',
  onDocument2: '#CCCCCC',
  onDocument3: '#9e9e9e',
  onDocumentHighlight: '#00b7ff',
  button: '#ff8e00',
  buttonHover: '#ffba65',
  button2: '#00c4ff',
  button2Hover: '#68dcff',
  onButton: '#ffffff',
  input: '#090c11',
  inputBorder: '#585e68',
  onInput: '#dcdcdc',

  onMain: '#dedede',
  main: '#323232',
  onCard: '#FFFFFF',
  card: '#323232',
}
