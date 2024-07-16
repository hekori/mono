import * as React from 'react'
import { TextHuge, TextSmall, TextXl } from '@hekori/uikit'
import {Card} from "./Card";

export interface PageItemProgressSummaryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subTitle?: string
  annotation?: string
}

export const PageItemProgressSummary: React.FC<PageItemProgressSummaryProps> = ({
  title,
  subTitle,
  annotation,
  ...props
}) => {
  return (
    <div>


      <Card>
          <div className="text-sm font-bold">Your request has been received!</div>
          <br />
        <TextHuge>{title}</TextHuge>
        <br />
        <TextXl>{subTitle}</TextXl>
      </Card>
        <br/>
      <Card>
          <div className="text-sm font-bold">Your annotation</div>
          <br />
          {annotation}</Card>
    </div>
  )
}
