import React, { TextareaHTMLAttributes } from 'react'
import { classNames } from '../ClassNames'

export const TextArea: React.FC<
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    errors?: string[]
  }
> = ({ label, errors = [], ...props }) => {
  return (
    <div className="flex flex-col flex-1">
      <textarea
        {...props}
        className={classNames(
          'p-2 block w-full border-2 border-inputBorder rounded-md bg-input text-onInput'
        )}
      />
      {label && (
        <label
          htmlFor={props.name}
          className="duration-300 -z-1 origin-0 text-onDocument text-sm"
        >
          {label}
        </label>
      )}
      {errors.length > 0 && (
        <div className="text-sm bg-error text-onError rounded p-2">
          {errors.join(', ')}
        </div>
      )}
    </div>
  )
}
