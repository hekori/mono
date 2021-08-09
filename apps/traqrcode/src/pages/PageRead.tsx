import * as React from 'react'
import { useGlobal } from '../index.provider'
import { ShellPublic } from '../components/ShellPublic'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { ReadRouteInfo } from '../routings'
import { useQuery } from 'react-query'
import {
  API_CODE,
  GetReadResponse,
  isGetReadResponseOk,
} from '@hekori/traqrcode-common'

type PropsPageRead = {
  routeInfo: ReadRouteInfo
}

export const PageRead: React.FC<PropsPageRead> = ({ routeInfo }) => {
  const { state, api } = useGlobal()
  const history = useHistory()

  const { isLoading, isFetching, error, data } = useQuery<GetReadResponse>(
    `pageItem--${routeInfo.pageItemUuid}`,
    async () => {
      return api.get(`/read/${routeInfo.pageItemUuid}`)
    },
    { refetchOnWindowFocus: false }
  )

  // useEffect(() => {
  //   const t = async () => {
  //     setLoading(true)
  //     const [err, res] = await to(
  //       api.get(`/read/${routeInfo.shortHash}/${routeInfo.itemId}`)
  //     )
  //     setLoading(false)
  //
  //     if (err) {
  //       console.log(err, res)
  //       setErrors(['SOME_ERROR'])
  //       return
  //     }
  //
  //     if (res.status === 'OK') {
  //       const task: Task = res.task
  //       history.push(
  //         `/task/${routeInfo.shortHash}/${routeInfo.itemId}/${task.id}`
  //       )
  //     } else if (res.status === 'ERROR') {
  //       setErrors(res.errors)
  //     }
  //   }
  //   void t()
  // }, [])

  if (isLoading || !data) return <Loading />
  if (error) return <div>Error</div>
  if (data?.status === API_CODE.ERROR) return <div>Error</div>

  let content
  if (isGetReadResponseOk(data)) {
    history.push(`/task/${data.pageItemProgressUuid}`)
  } else {
    console.log('data', data)
    content = (
      <ul>
        {data?.errors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    )
  }

  console.log(state)

  return (
    <ShellPublic>
      <div className="w-full mx-auto text-center pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">{content}</div>
      </div>
    </ShellPublic>
  )
}
