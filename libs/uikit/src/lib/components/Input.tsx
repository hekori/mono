import React, { InputHTMLAttributes } from 'react'

export const Input: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    errors?: string[]
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
> = ({ label, errors = [], textSize = 'md', ...props }) => {
  return (
    <>
      <input
        {...props}
        className={`p-2 block w-full border-2 border-inputBorder rounded-md bg-input text-onInput text-${textSize}`}
      />
      {label && (
        <label
          htmlFor={props.name}
          className="duration-300 -z-1 origin-0 text-gray-500 text-sm"
        >
          {label}
        </label>
      )}
      {errors.length > 0 && (
        <span className="text-sm text-red-600 hidden" id="error">
          {errors.join(', ')}
        </span>
      )}
    </>
  )
}
