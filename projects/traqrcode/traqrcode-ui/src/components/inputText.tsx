import * as React from 'react'

type InputTextProps = {
  placeholder: string
  label?: string
  value: string
  helpText?: string
  errors?: string[]
  onChange: (event: any) => void
  onBlur?: (event: any) => void
  onKeyPressEnter?: (event: any) => void
  autoFocus?: boolean
}

export const InputText = ({
  placeholder,
  label,
  value,
  helpText,
  errors = [],
  onChange,
  onBlur = (e) => {},
  onKeyPressEnter = (e) => {},
  autoFocus = false,
}: InputTextProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-grey-darker text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className="text-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onKeyPressEnter(e)
          }
        }}
      />
      {helpText && <div className="text-gray-500">{helpText}</div>}
      {errors.map((error) => (
        <div className="text-gray-100 text-left p-2" key={error}>
          {error}
        </div>
      ))}
    </div>
  )
}
