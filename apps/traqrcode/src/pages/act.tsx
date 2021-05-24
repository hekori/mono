import * as React from 'react'
import { useEffect, useState } from 'react'
import { ContextState } from '../index.provider'
import { Shell } from '../components/shell'
import { useHistory } from 'react-router-dom'
import {
    ActRouteInfo,
    getFrontendActUrl,
    getFrontendTaskUrl,
    Task,
    to,
} from '@hekori/traqrcode-common'
import { api } from '../api'
import { Loading } from '../components/Loading'

type PropsPageAction = {
    routeInfo: ActRouteInfo
}

export const PageAction = ({ routeInfo }: PropsPageAction) => {
    const { state } = React.useContext(ContextState)

    const history = useHistory()

    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [task, setTask] = useState<Task>({
        id: '',
        step: 0,
        createdAt: '',
        notifiedAt: '',
        startedAt: '',
        doneAt: '',
    })

    useEffect(() => {
        const t = async () => {
            setLoading(true)
            let err, res
            ;[err, res] = await to(api.get(getFrontendActUrl(routeInfo)))
            setLoading(false)

            if (err) {
                console.log(err, res)
                setErrors(res.errors)
                return
            }

            if (res.status === 'OK') {
                setTask(res.task as Task)
            } else if (res.status === 'ERROR') {
                setErrors(res.errors)
            }
        }
        void t()
    }, [])

    console.log(state)

    if (loading) return <Loading />

    let content = null

    if (task.doneAt) {
        content = <h1>You have finished the task</h1>
    } else if (task.startedAt) {
        content = <h1>You have successfully accepted the task</h1>
    }

    if (errors.length > 0) {
        content = (
            <>
                {errors.map((error) => (
                    <h1 key={error}>{error}</h1>
                ))}
            </>
        )
    }

    return (
        <Shell>
            <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
                <div className="container max-w-5xl mx-auto m-8">
                    {content}

                    <button
                        className="button"
                        onClick={() => {
                            history.push(getFrontendTaskUrl(routeInfo))
                        }}
                    >
                        View
                    </button>
                </div>
            </div>
        </Shell>
    )
}
