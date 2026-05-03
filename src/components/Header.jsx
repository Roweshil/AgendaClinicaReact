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
            {loading ? (
                <span>Cargando</span>  // no muestra nada mientras carga
            ) : user ? (
                <section className="section--header-logged">
                    <p>{user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</p>
                    <button className="btn-tutorial">TUTORIALES DE USO</button>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </section>
            ) : (
                <nav>
                    <span>No has iniciado sesión</span>
                    <Login />
                </nav>
            )}
        </header>
    )
}