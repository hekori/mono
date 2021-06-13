import * as React from 'react'
import { useEffect, useState } from 'react'
import { GlobalContext, useGlobal } from '../index.provider'
import { ShellPublic } from '../components/ShellPublic'
import { TypeErrors } from './frontpage'
import {
  getBackendLoginPostUrl,
  PostLoginResponse,
  to,
} from '@hekori/traqrcode-common'
import {
  ButtonPrimary,
  ButtonSecondary,
  Input,
  TextNormal,
} from '@hekori/uikit'
import { ExclamationIcon } from '@heroicons/react/outline'
import { humanReadableTimeDifference, now } from '@hekori/dates'
import { Container } from '../components/Container'

export const Step2: React.FC<
  PostLoginResponse & { setServerResponse: (args: any) => void }
> = ({ emailSentAt, email, setServerResponse }) => {
  const [ago, setAgo] = useState<string>(
    humanReadableTimeDifference(emailSentAt, now())
  )

  useEffect(() => {
    const runnerId = setInterval(
      () => setAgo(humanReadableTimeDifference(emailSentAt, now())),
      1000
    )
    return () => clearInterval(runnerId)
  }, [emailSentAt])

  return (
    <ShellPublic>
      <Container>
        <div className="bg-document3 border-l-4 border-document2 p-4 border-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-16 w-16 text-onDocument"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-onDocument2 flex flex-col justify-center">
              <TextNormal>
                We sent an email to {email} <b>{ago}</b>. It should arrive in
                seconds. <br />
                Please check your inbox. If you do not receive an email within
                30 seconds, check your spam folder and retry sending the email.
              </TextNormal>
            </div>
          </div>
        </div>
        <ButtonSecondary
          type="submit"
          className={`min-w-full`}
          onClick={() => {
            setServerResponse(undefined)
          }}
        >
          Back
        </ButtonSecondary>
      </Container>
    </ShellPublic>
  )
}

export const PageSignup = () => {
  const { state, setState, api } = useGlobal()
  const [errors, setErrors] = useState<TypeErrors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)

  const [serverResponse, setServerResponse] = useState<
    PostLoginResponse | undefined
  >(undefined)

  if (serverResponse)
    return <Step2 {...serverResponse} setServerResponse={setServerResponse} />
  else
    return (
      <ShellPublic>
        <Container>
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-onDocument md:mt-16">
            Enter your email
          </h2>
          <h3 className="w-full my-2 text-xl leading-tight text-center text-onDocument2">
            to manage your QR code
          </h3>

          <div className="flex-1 flex justify-start flex-col mt-12">
            <form
              className="flex-1 flex-col"
              onSubmit={async (e) => {
                console.log('submitting')
                e.preventDefault()

                // front end validation
                if (!state.admin || submitting) return

                setSubmitting(true)
                const [err, res] = await to(
                  api.post(getBackendLoginPostUrl(), {
                    admin: state.admin,
                  })
                )
                setSubmitting(false)

                if (err) {
                  console.log(err, res)
                  setErrors({
                    ...errors,
                    global: 'UNKNOWN_ERROR',
                  })
                  return
                }

                if (res.status === 'ERROR') {
                  console.log('error', res.errors)
                  setErrors(res.errors)
                } else {
                  setServerResponse(res)
                  // history.push(`/edit/${res.shortHash}/${res.accessToken}`)
                }
              }}
            >
              <Input
                placeholder={'Enter your email'}
                className="text-xl"
                onChange={(e) => {
                  setState({
                    ...state,
                    admin: e.target.value,
                  })
                }}
                value={state.admin}
                errors={errors.admin ? [errors.admin] : []}
              />
              <div className={'h-2'} />
              <div className="text-red-500">{errors.global}</div>

              <div
                className={`progress-line ${
                  submitting ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <ButtonPrimary
                type="submit"
                className={`min-w-full ${
                  !state.admin || submitting ? 'disabled' : ''
                }`}
                data-testid="button-create"
              >
                {' '}
                Setup
              </ButtonPrimary>
            </form>
          </div>
        </Container>{' '}
      </ShellPublic>
    )
}
