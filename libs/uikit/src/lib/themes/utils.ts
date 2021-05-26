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
    '--color-primary': theme.primary || '',
    '--color-secondary': theme.secondary || '',
    '--color-text-primary': theme.textPrimary || '',
    '--color-text-secondary': theme.textSecondary || '',
    '--color-text-primary-contrast': theme.textPrimaryContrast || '',
    '--color-text-secondary-contrast': theme.textSecondaryContrast || '',
    '--color-text-link': theme.textLink || '',
    '--background-primary': theme.backgroundPrimary || '',
    '--background-secondary': theme.backgroundSecondary || '',
    '--background-primary-contrast': theme.backgroundPrimaryContrast || '',
    '--background-secondary-contrast': theme.backgroundSecondaryContrast || '',
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
