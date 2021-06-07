import { HTMLAttributes, SVGProps } from 'react'

export const HowItWorksAnimatedSvg: React.FC<SVGProps<SVGElement>> = ({
  width,
  height,
}) => {
  return (
    <svg width={width} height={height} version="1.1" viewBox="0 0 240 135">
      <g id="root">
        <g>
          <rect x="60" y="55" width="24" height="60" fill="#236997"></rect>
          <rect x="84" y="31" width="24" height="84" fill="#52aaeb"></rect>
          <rect x="108" y="75" width="24" height="40" fill="#a75e07"></rect>
          <rect x="132" y="89" width="24" height="26" fill="#f4a22d"></rect>
          <rect x="156" y="68" width="24" height="47" fill="#f95b3a"></rect>
        </g>
      </g>
    </svg>
  )
}
