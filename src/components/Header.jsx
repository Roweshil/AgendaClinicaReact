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
                <section className="header__logged">
                    <img src="https://res.cloudinary.com/dj7fmczq9/image/upload/f_auto,q_auto/logoHorizontal_nojgyx" alt="" className="header__img"/>
                    <button className="btn-tutorial btn--secundario">TUTORIALES DE USO</button>
                    <button onClick={handleLogout} className="btn section--header-button-logout" >Cerrar sesión</button>
                </section>
            ) : (
                <section className="header__not-logged">
                    <nav>
                        <img src="https://res.cloudinary.com/dj7fmczq9/image/upload/f_auto,q_auto/logoHorizontal_nojgyx" alt="" className="header__img" />
                        <Login />
                    </nav>
                </section>

            )}
        </header>
    )
}