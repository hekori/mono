import { Theme } from './types'
import { LightTheme } from './LightTheme'

export const DarkTheme: Theme = {
  ...LightTheme,
  onDocument: '#FFFFFF',
  document: '#000000',
  onMain: '#dedede',
  main: '#323232',
  onCard: '#FFFFFF',
  card: '#323232',
}
