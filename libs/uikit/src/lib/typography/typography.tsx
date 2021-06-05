import { classNames } from '../ClassNames'
import React from 'react'

export const TextNormal: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
}) => {
  return <span className="text-base text-primary">{children}</span>
}

export const TextSmall: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
}) => {
  return <span className="text-sm font-bold mb-8 text-primary">{children}</span>
}

export const TextTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <h1
      {...props}
      className={classNames(
        'text-4xl font-bold mb-8 text-primary',
        props.className
      )}
    >
      {children}
    </h1>
  )
}

export const TextSubtitle: React.FC<
  React.HTMLAttributes<HTMLHeadingElement>
> = ({ children, ...props }) => {
  return (
    <h2
      {...props}
      className={classNames(
        'text-2xl font-bold mb-8 text-primary',
        props.className
      )}
    >
      {children}
    </h2>
  )
}
