import * as React from 'react'
import { TextNormal, TextTitle } from '@hekori/uikit'

export const TypographyStory: React.FC = () => {
  return (
    <>
      <TextNormal>Normal</TextNormal>
      <TextTitle>Title</TextTitle>
      <span className="text-primary">test</span>
    </>
  )
}
