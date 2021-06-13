import * as React from 'react'
import { useLayoutEffect, useState } from 'react'
import { ContextState } from '../index.provider'
import { TypeErrors } from './frontpage'
import { ShellPublic } from '../components/ShellPublic'
import { Container } from '../components/Container'
import { environment } from '../environments/environment'
import { useHistory } from 'react-router-dom'
import { CheckLoginRouteInfo } from '../routings'

interface PropsPageCheckLogin {
  routeInfo: CheckLoginRouteInfo
}
export const PageCheckLogin: React.FC<PropsPageCheckLogin> = ({
  routeInfo,
}) => {
  const { state, setState } = React.useContext(ContextState)
  const [errors, setErrors] = useState<TypeErrors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [emailSentAt, setEmailSentAt] = useState<string | undefined>(undefined)

  const history = useHistory()
  useLayoutEffect(() => {
    const runEffect = async () => {
      const key = environment.getAccessTokenLocalStorageKey()
      localStorage.setItem(key, routeInfo.accessToken)
      history.push('/list')
    }

    void runEffect()
  }, [])

  return (
    <ShellPublic>
      <Container>Logging you in ..</Container>
    </ShellPublic>
  )
}
