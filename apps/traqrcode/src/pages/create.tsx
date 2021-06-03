import * as React from 'react'
import { useState } from 'react'
import { ContextState } from '../index.provider'
import { Shell } from '../components/shell'
import { useHistory } from 'react-router-dom'
import { api } from '../api'
import { InputText } from '../components/inputText'
import { TypeErrors } from './frontpage'
import { getBackendCreatePostUrl } from '../../../traqrcode-common/src/urls'
import { to } from '../../../traqrcode-common/src/misc'

export const PageCreate = () => {
  const { state, setState } = React.useContext(ContextState)
  const [errors, setErrors] = useState<TypeErrors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)

  const history = useHistory()

  return (
    <Shell>
      <div className="w-full mx-auto text-center pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-onDocument">
            Enter your email
          </h2>
          <h3 className="w-full my-2 text-xl leading-tight text-center text-onDocument2">
            to manage your QR code
          </h3>

          <div className="flex-1 flex justify-start flex-col p-8">
            <form
              className="flex-1 flex-col"
              onSubmit={async (e) => {
                console.log('submitting')
                e.preventDefault()

                // front end validation
                if (!state.admin || submitting) return

                setSubmitting(true)
                const [err, res] = await to(
                  api.post(getBackendCreatePostUrl(), {
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
                  history.push(`/edit/${res.shortHash}/${res.accessToken}`)
                }
              }}
            >
              <InputText
                placeholder={'Enter your email'}
                onChange={(e) => {
                  setState({
                    ...state,
                    admin: e.target.value,
                  })
                }}
                value={state.admin}
                errors={errors.admin ? [errors.admin] : []}
              />

              <div className="text-red-500">{errors.global}</div>

              <div
                className={`progress-line ${
                  submitting ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <button
                type="submit"
                className={`button min-w-full ${
                  !state.admin || submitting ? 'disabled' : ''
                }`}
                data-testid="button-create"
              >
                {' '}
                Setup
              </button>
            </form>
          </div>
        </div>
      </div>
    </Shell>
  )
}
