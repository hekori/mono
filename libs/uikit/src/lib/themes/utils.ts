import { themes } from './index'
import { Theme } from './types'

export interface IThemes {
  [key: string]: Theme
}

export interface IMappedTheme {
  [key: string]: string | null
}

export const mapTheme = (theme: Theme): IMappedTheme => {
  return { ...theme }
}

export const applyTheme = (themeName: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[themeName])
  if (!themeObject) return

  console.log('themeObject', themeObject)

  const root = document.documentElement

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return
    }

    root.style.setProperty(`--${property}`, themeObject[property])
  })
}

export const extend = (extending: Theme, newTheme: Theme): Theme => {
  return { ...extending, ...newTheme }
}
