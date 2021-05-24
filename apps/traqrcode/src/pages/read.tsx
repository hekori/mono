import { ReadRouteInfo } from '../app'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ContextState } from '../index.provider'
import { Shell } from '../components/shell'
import { useHistory } from 'react-router-dom'
import { to } from '@hekori/traqrcode-common'
import { api } from '../api'
import { Loading } from '../components/Loading'
import { Task } from '../../../traqrcode-common/src/interfaces/models'

type PropsPageRead = {
  routeInfo: ReadRouteInfo
}

export const PageRead = ({ routeInfo }: PropsPageRead) => {
  const { state } = React.useContext(ContextState)

  const history = useHistory()
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const t = async () => {
      setLoading(true)
      let err, res
      ;[err, res] = await to(
        api.get(`/read/${routeInfo.shortHash}/${routeInfo.itemId}`)
      )
      setLoading(false)

      if (err) {
        console.log(err, res)
        setErrors(['SOME_ERROR'])
        return
      }

      if (res.status === 'OK') {
        const task: Task = res.task
        history.push(
          `/task/${routeInfo.shortHash}/${routeInfo.itemId}/${task.id}`
        )
      } else if (res.status === 'ERROR') {
        setErrors(res.errors)
      }
    }
    void t()
  }, [])

  console.log(state)

  if (loading) return <Loading />

  return (
    <Shell>
      <div className="w-full mx-auto text-center pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  )
}
