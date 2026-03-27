import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export function ProtectedRoute({ children }) {
    const { user } = useAuth()

    if (user) return <Navigate to="/" />  // logueado → siempre al home

    return children
}