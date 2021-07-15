import React from 'react'
import { classNames } from '../ClassNames'
import { ButtonProps } from './types'

export const ButtonFlat: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      //focus:outline-none focus:ring-1 focus:ring-offset-1
      className={classNames(
        'cursor-pointer px-8 py-4 flex justify-center font-medium rounded-md text-onDocument hover:text-onDocumentHighlight focus:text-onDocument focus:outline-none',
        props.className
      )}
    >
      {children}
    </button>
  )
}
