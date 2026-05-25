import { NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function BarraLateralMedicoDesktop() {
    const {user} = useAuth()

    const nombreCliente = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1);

    const apellidoCliente = user.apellido.charAt(0).toUpperCase() + user.apellido.slice(1); 

    return (
        <aside className="navbar">
            <h2 className="navbar__title">Menú</h2>
            <nav className="navbar__main">
                <ul className="navbar__btns">
                    <li className="navbar__btn"><NavLink to="/" className="bar-link">Home</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/lista" className="bar-link">Consultar</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/crear" className="bar-link">Crear</NavLink></li>
                </ul>
                <ul className="navbar__btns navbar__help">
                    <li className="navbar__btn"><NavLink to="/perfil" className="bar-link">Dr {nombreCliente} {apellidoCliente}</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/configuracion" className="bar-link">Configuración</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/soporte" className="bar-link">Soporte</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}