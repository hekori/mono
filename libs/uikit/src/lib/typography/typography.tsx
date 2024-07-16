import { classNames } from '../ClassNames'
import React from 'react'


export const TextHuge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
                                                                          children,
                                                                        }) => {
  return <span className="text-4xl text-primary">{children}</span>
}


export const TextXl: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
                                                                             children,
                                                                           }) => {
  return <span className="text-xl text-primary">{children}</span>
}

export const TextLarge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
}) => {
  return <span className="text-lg text-primary">{children}</span>
}

export const TextNormal: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
}) => {
  return <span className="text-base text-primary">{children}</span>
}

export const TextSmall: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
}) => {
  return <span className="text-sm mb-8 text-primary">{children}</span>
}

export const TextTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <span
      {...props}
      className={classNames(
        'text-4xl font-bold mb-8 text-primary',
        props.className
      )}
    >
      {children}
    </span>
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
