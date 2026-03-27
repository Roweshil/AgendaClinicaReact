import { useNavigate } from 'react-router-dom'

import { Login } from "./Login.jsx"
import { useAuth } from "../hooks/useAuth.js"
import { logError } from "../utils/logError.js"


export function Header() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    

    const logout = async () => {
        try {
            await fetch("http://localhost:3050/api/auth/logout", {
            method: "POST",
            credentials: "include"
            })
        } catch (error) {
            logError(error, 'login')
            alert("Servidor no disponible intente mas tarde")
        } finally {
                setUser(null)
            }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <header className="header">
          <h1>RoweApps</h1>
            {user ? (
                // Hay sesión activa
                <nav>
                <span>Hola, {user.nombre}</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
                </nav>
            ) : (
                // No hay sesión activa
                <nav>
                    <span>No has iniciado sesión</span>
                    <Login />
                </nav>    
            )}

        </header>
    )
}