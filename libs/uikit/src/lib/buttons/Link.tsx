import React from 'react'
import { classNames } from '../ClassNames'

export const Link: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  children,
  href,
  ...props
}) => {
  return (
    <a
      href={href}
      {...props}
      className={classNames(
        'cursor-pointer text-onDocumentHighlight hover:underline focus:underline focus:outline-none',
        props.className
      )}
    >
      {children}
    </a>
  )
}
