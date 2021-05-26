import { themes } from './index'
import { Theme } from './types'

export interface IThemes {
  [key: string]: Theme
}

export interface IMappedTheme {
  [key: string]: string | null
}

export const mapTheme = (theme: Theme): IMappedTheme => {
  return {
    '--text-primary': theme.textPrimary || '',
    '--text-secondary': theme.textSecondary || '',
    '--background-primary': theme.backgroundPrimary || '',
    '--background-secondary': theme.backgroundSecondary || '',
  }
}

export const applyTheme = (theme: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[theme])
  if (!themeObject) return

  const root = document.documentElement

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return
    }

    root.style.setProperty(property, themeObject[property])
  })
}

export const extend = (extending: Theme, newTheme: Theme): Theme => {
  return { ...extending, ...newTheme }
}
