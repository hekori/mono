import React from 'react'

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export type ButtonProps = HtmlButtonProps // & Required<Pick<HtmlButtonProps, 'aria-label'>>
