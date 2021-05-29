import * as React from 'react'

const ColorCard: React.FC<{ bgClass: string; textClass?: string }> = ({
  bgClass,
  textClass = '',
}) => {
  return (
    <div className="flex flex-row items-center">
      <span
        className={
          'h-24 w-48 flex items-center justify-center rounded-md ring-full ring-red ring-2 m-2 ' +
          bgClass +
          ' ' +
          textClass
        }
      >
        {textClass}
      </span>
      <span>{bgClass}</span>
    </div>
  )
}

export const ColorStory: React.FC = () => {
  return (
    <>
      <ColorCard bgClass="bg-document" textClass="text-onDocument" />
      <ColorCard bgClass="bg-main" textClass="text-onMain" />
      <ColorCard bgClass="bg-input" textClass="text-onInput" />
      <ColorCard bgClass="bg-navigation" textClass="text-onNavigation" />
      <ColorCard bgClass="bg-subNavigation" textClass="text-onSubNavigation" />
      <ColorCard bgClass="bg-divider" />
      <ColorCard bgClass="bg-card" textClass="text-onCard" />
      <ColorCard bgClass="bg-error" textClass="text-onError" />
      <ColorCard bgClass="bg-warning" textClass="text-onWarning" />
      <ColorCard bgClass="bg-success" textClass="text-onSuccess" />
      <ColorCard bgClass="bg-button" textClass="text-onButton" />
    </>
  )
}
