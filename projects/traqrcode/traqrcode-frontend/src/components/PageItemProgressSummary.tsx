import * as React from 'react'
import { TextHuge, TextSmall, TextXl } from '@hekori/uikit'
import { Card } from './Card'

export interface PageItemProgressSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  titleLabel?: string
  title?: string
  subTitle?: string
  annotationLabel?: string
  annotation?: string
}

export const PageItemProgressSummary: React.FC<PageItemProgressSummaryProps> = ({
  titleLabel,
  title,
  subTitle,
  annotationLabel,
  annotation,
  ...props
}) => {
  return (
    <div className={'text-left'}>
      <Card>
        <div className="text-sm font-bold">{titleLabel}</div>
        <br />
        <TextHuge>{title}</TextHuge>
        <br />
        <TextXl>{subTitle}</TextXl>
      </Card>
      <br />
      <Card>
        <div className="text-sm font-bold">{annotationLabel}</div>
        <br />
        <div className={'whitespace-pre-line'}>{annotation}</div>
      </Card>
    </div>
  )
}
