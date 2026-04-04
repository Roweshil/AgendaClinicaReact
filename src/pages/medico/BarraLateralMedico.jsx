import { Link } from "react-router-dom"

export function BarraLateralMedico() {
    return (
        <aside className="medico-bar">
            <h2>Mi sistema</h2>
            <nav>
                <ul>
                    <li><Link to="/" className="bar-link">Home</Link></li>
                    <li><Link to="/lista" className="bar-link">Consultar</Link></li>
                    <li><Link to="/crear" className="bar-link">Crear</Link></li>
                </ul>
            </nav>
        </aside>
    )
}