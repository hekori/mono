import { ButtonFlat } from '@hekori/uikit'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

interface NavLinkProps {
  matcher: (link: string) => boolean
  link: string
}

export const NavLink: React.FC<NavLinkProps> = ({ matcher, link }) => {
  const history = useHistory()

  return (
    <li className="mr-3">
      <ButtonFlat
        aria-label="Go to pricing page"
        onClick={() => history.push('/pricing')}
      >
        Pricing
      </ButtonFlat>
    </li>
  )
}
