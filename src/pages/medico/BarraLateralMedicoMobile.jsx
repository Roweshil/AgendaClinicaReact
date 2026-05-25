import { NavLink } from "react-router-dom"

export function BarraLateralMedicoMobile() {
    return (
        <aside className="navbar">
            <h2 className="navbar_title">Menú</h2>
            <nav>
                <ul className="navbar__btns">
                    <li className="navbar__btn"><NavLink to="/" className="bar-link">Home</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/lista" className="bar-link">Consultar</NavLink></li>
                    <li className="navbar__btn"><NavLink to="/crear" className="bar-link">Crear</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}