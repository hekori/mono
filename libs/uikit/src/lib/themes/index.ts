// adapted from https://dev.to/ohitslaurence/creating-dynamic-themes-with-react-tailwindcss-59cl

import { IThemes } from './utils'
import { LightTheme } from './LightTheme'
import { DarkTheme } from './DarkTheme'

export const themes: IThemes = {
  LightTheme,
  DarkTheme,
}
export { applyTheme } from './utils'
