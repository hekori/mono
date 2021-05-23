import React, { useEffect, useState } from 'react'
import { Shell } from '@hekori/uikit'
import { useGlobal } from '../../GlobalProvider'

interface News {
    id: string
    title: string
}

export const IndexPage: React.FC = () => {
    const { connect, accessToken } = useGlobal()
    const [items, setItems] = useState<News[]>([])

    useEffect(() => {
        const socket = connect(accessToken)

        socket.on('news', function (data) {
            console.log('items', items)
            const n = [...items, data]
            console.log(n)
            setItems((items) => [...items, data])
            // console.log(data)
        })
    }, [])

    return (
        <Shell>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
                    >
                        {item.id} {item.title}
                    </li>
                ))}
            </ul>
        </Shell>
    )
}
