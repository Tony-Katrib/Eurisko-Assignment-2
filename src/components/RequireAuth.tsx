import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../store/useAuth'

export default function RequireAuth({ children }: { children: ReactElement }) {
    const { accessToken } = useAuth()

    if (!accessToken) {
        return <Navigate to="/login" replace />
    }

    return children
}
