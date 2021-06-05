import { TextTitle } from '@hekori/uikit'
import * as React from 'react'

interface SectionHeaderProps {
  title: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <>
      <TextTitle className="w-full text-center">{title}</TextTitle>
      <div className="w-full mb-12">
        <div className="h-1 mx-auto bg-divider w-64 my-0 py-0 rounded-t" />
      </div>
    </>
  )
}
