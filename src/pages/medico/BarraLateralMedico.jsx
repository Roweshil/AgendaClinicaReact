import { Link } from "react-router-dom"

export function BarraLateralMedico() {
    return (
        <aside className="sidebar">
            <h2>Mi sistema</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/lista">Consultar Citas</Link></li>
                    <li><Link to="/crear">Crear Cita</Link></li>
                    <li><Link to="/actualizar">Actualizar Cita</Link></li>
                    <li><Link to="/borrar">Borrar Cita</Link></li>
                </ul>
            </nav>
        </aside>
    )
}