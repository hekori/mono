import * as React from 'react'
import { TextNormal, TextTitle } from '@hekori/uikit'
import { applyTheme } from '../../../../libs/uikit/src/lib/themes/utils'

export const TypographyStory: React.FC = () => {
  applyTheme('DarkTheme')
  return (
    <>
      <TextNormal>Normal</TextNormal>
      <TextTitle>Title</TextTitle>
      <span className="text-primary">test</span>
    </>
  )
}
