import { NavLink } from "react-router-dom"

export function BarraLateralMedico() {
    return (
        <aside className="medico-navbar">
            <h2 className="medico-navbar_title">Mi sistema</h2>
            <nav>
                <ul className="medico-navbar_buttons">
                    <li className="medico-navbar_button"><NavLink to="/" className="bar-link">Home</NavLink></li>
                    <li className="medico-navbar_button"><NavLink to="/lista" className="bar-link">Consultar</NavLink></li>
                    <li className="medico-navbar_button"><NavLink to="/crear" className="bar-link">Crear</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}