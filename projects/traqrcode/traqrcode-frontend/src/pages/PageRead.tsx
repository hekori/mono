import * as React from 'react'
import {useState} from 'react'
import {useGlobal} from '../hooks/useGlobal'
import {useHistory} from 'react-router-dom'
import {Loading} from '../components/Loading'
import {useQuery} from 'react-query'
import {
    API_CODE,
    getBackendAnnotationPostUrl,
    GetReadResponse,
    isGetReadResponseOk,
    PostAnnotationRequest,
    PostAnnotationResponse,
    to,
} from '@hekori/traqrcode-common'
import {Error500} from '../components/Error500'
import {Shell} from '../components/Shell'
import {ReadRouteInfo} from '../routing/routingTypes'
import {ButtonSecondary, TextArea} from '@hekori/uikit'

type PropsPageRead = {
  routeInfo: ReadRouteInfo
}

export const PageRead: React.FC<PropsPageRead> = ({ routeInfo }) => {
  const { state, api } = useGlobal()
  const history = useHistory()


  const [annotation, setAnnotation] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  const { isLoading, isFetching, error, data } = useQuery<GetReadResponse>(
    `pageItem--${routeInfo.pageItemUuid}`,
    async () => {
      return api.get(`/read/${routeInfo.pageItemUuid}`)
    },
    { refetchOnWindowFocus: false }
  )

  let content

  if (isLoading || !data) content = <Loading />
  else if (error) content = <Error500 />
  else if (data?.status === API_CODE.ERROR) content = <Error500 />
  else if (isGetReadResponseOk(data) && data.pageItem.customInstructions.length === 0) {


      const f = async () => {
          const [err, res] = await to(
              api.post<PostAnnotationResponse, PostAnnotationRequest>(
                  getBackendAnnotationPostUrl(),
                  { pageItemUuid: routeInfo.pageItemUuid, annotation }
              )
          )

          if (err) {
              console.log(err, res)
              setErrors(err)
              return
          }
          history.push(`/task/${res.pageItemProgressUuid}`)
      }
      void f()

      content = <Loading />

  }
  else if (isGetReadResponseOk(data) ) {

    content = (
        <div className="w-full mx-auto text-left pt-6 pb-12 min-h-screen">
          <div className="container max-w-5xl mx-auto m-8 p-8">
            <h1 className={'text-xl pb-8'}> Please enter additional information </h1>

            <TextArea
                className={'text-md'}
                rows={10}
                placeholder={data.pageItem.customInstructions}
                value={annotation}
                onChange={s => setAnnotation(s.target.value)}
                errors={errors}
            />

            <ButtonSecondary
                className="min-w-full mt-8"
                onClick={async (e) => {
                  e.preventDefault()
                  const [err, res] = await to(
                    api.post<PostAnnotationResponse, PostAnnotationRequest>(
                      getBackendAnnotationPostUrl(),
                      { pageItemUuid: routeInfo.pageItemUuid, annotation }
                    )
                  )

                  if (err) {
                    console.log(err, res)
                    setErrors(err)
                    return
                  }
                    history.push(`/task/${res.pageItemProgressUuid}`)
                }}
            >
              Next
            </ButtonSecondary>


          </div>
        </div>
    )


  } else {
    console.log('data', data)
    content = (
      <div className="w-full mx-auto text-center pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <ul>
            {data?.errors?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  console.log(state)

  return <Shell>{content}</Shell>
}
