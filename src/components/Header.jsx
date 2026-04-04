import { useNavigate } from 'react-router-dom'

import { Login } from "./Login.jsx"
import { useAuth } from "../hooks/useAuth.js"

 


export function Header() {
    const {user, loading, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <header className="header">
            <h1>RoweApps</h1>
            
            {loading ? (
                <span>Cargando</span>  // no muestra nada mientras carga
            ) : user ? (
                <nav>
                    <button className="btn-tutorial">TUTORIALES DE USO</button>
                    <span>Hola, {user.nombre}</span>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </nav>
            ) : (
                <nav>
                    <span>No has iniciado sesión</span>
                    <Login />
                </nav>
            )}
        </header>
    )
}