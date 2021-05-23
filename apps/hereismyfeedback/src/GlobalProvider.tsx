import { io, Socket } from 'socket.io-client'
import React, { useContext, useMemo } from 'react'

export const GlobalCtx = React.createContext(null)

interface GlobalProviderProps {
    children: React.ReactChildren | React.ReactChild
}
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const connect = (accessToken: string) => {
        console.log('called connect with encoded accessToken', accessToken)
        // return io("localhost:3000");

        return io('http://localhost:8001', {
            query: {
                accessToken,
            },
        })
    }

    const accessToken =
        'eyJhbGciOiJIUzI1NiJ9.aGFoYQ.AU4yLOflDa5y9q2wR8ZMPmJylZwcd-t04qGRymdIZ0A'
    return (
        <GlobalCtx.Provider value={{ connect, accessToken }}>
            {children}
        </GlobalCtx.Provider>
    )
}

interface UseGlobalReturn {
    connect: (accessToken: string) => Socket
    accessToken: string
}
export const useGlobal = (): UseGlobalReturn => {
    return useContext(GlobalCtx)
}
