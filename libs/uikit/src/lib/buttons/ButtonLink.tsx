import React from 'react'
import { classNames } from '../ClassNames'
import { Link, LinkProps } from 'react-router-dom'

export const ButtonLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      className={classNames(
        'cursor-pointer text-onDocumentHighlight hover:underline focus:underline focus:outline-none',
        props.className
      )}
    >
      {children}
    </Link>
  )
}
