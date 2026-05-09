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
                    <button className="btn-tutorial button-2">TUTORIALES DE USO</button>
                    <button onClick={handleLogout} className="button-2 cita-card-button-3" >Cerrar sesión</button>
                </section>
            ) : (
                <section className="section--header-not-logged">
                    <nav>
                        <Login />
                    </nav>
                </section>

            )}
        </header>
    )
}