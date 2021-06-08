import { HTMLAttributes, SVGProps, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion'

const variants = {
  step1: { strokeDashoffset: 40 },
  step2: { strokeDashoffset: 0 },
}

interface RepeatingPathProps {
  x1: number
  y1: number
  x2: number
  y2: number
}
const RepeatingPath = ({ x1, y1, x2, y2 }: RepeatingPathProps) => {
  return (
    <motion.path
      d={`M ${x1} ${y1} L ${x2} ${y2}`}
      initial="step1"
      animate="step2"
      // transform="translate(50 50)"
      transition={{ repeat: Infinity, duration: 3 }}
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 100%)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="20,20"
      variants={variants}
    />
  )
}

export const HowItWorksAnimatedSvg: React.FC<SVGProps<SVGElement>> = ({
  width,
  height,
}) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <motion.svg
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
      whileHover="hover"
      whileTap="pressed"
      width="440"
      height="440"
      onClick={() => setIsChecked(!isChecked)}
    >
      <RepeatingPath x1={50} y1={50} x2={150} y2={150} />
      {/*<motion.path*/}
      {/*  d="M 0 0 L 100 0"*/}
      {/*  initial="step1"*/}
      {/*  animate="step2"*/}
      {/*  transform="translate(50 50)"*/}
      {/*  transition={{ repeat: Infinity, duration: 3 }}*/}
      {/*  fill="transparent"*/}
      {/*  strokeWidth="3"*/}
      {/*  stroke="hsl(0, 0%, 100%)"*/}
      {/*  strokeLinecap="round"*/}
      {/*  strokeLinejoin="round"*/}
      {/*  strokeDasharray="20,20"*/}
      {/*  variants={variants}*/}
      {/*/>*/}
    </motion.svg>
  )
}
