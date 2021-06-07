import { themes } from './index'
import { Theme } from './types'

export interface IThemes {
  [key: string]: Theme
}

export interface IMappedTheme {
  [key: string]: string | null
}

export const generateTailwindConfig = (
  theme: IMappedTheme
): Record<string, string> => {
  const result: Record<string, string> = {}

  for (const property of Object.keys(theme).filter(Boolean)) {
    result[property] = `var(--${property})`
  }

  return result
}

export const mapTheme = (theme: Theme): IMappedTheme => {
  return { ...theme }
}

export const applyTheme = (themeName: string): void => {
  const themeObject: IMappedTheme = mapTheme(themes[themeName])
  if (!themeObject) return

  console.log(generateTailwindConfig(themeObject))

  const root = document.documentElement

  document.body.classList.add('bg-document')

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
