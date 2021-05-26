import * as React from 'react'
import { TextNormal, TextTitle } from '@hekori/uikit'

export const ColorStory: React.FC = () => {
  return (
    <>
      <div className="p-4 bg-primary-background text-primary">
        bg-primary-background text-primary
      </div>
      <div className="p-4 bg-secondary-background text-secondary">
        bg-secondary-background text-secondary
      </div>
      <div className="p-4 bg-primary-contrast-background text-secondary-contrast-text">
        bg-primary-contrast-background
      </div>
      <div className="p-4 bg-secondary-contrast-background">
        bg-primary-contrast-background
      </div>
    </>
  )
}
