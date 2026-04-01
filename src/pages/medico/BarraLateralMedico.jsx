import { Link } from "react-router-dom"

export function BarraLateralMedico() {
    return (
        <aside className="medico-sidebar">
            <h2>Mi sistema</h2>
            <nav>
                <ul>
                    <li><Link to="/" className="sidebar-link">Home</Link></li>
                    <li><Link to="/lista" className="sidebar-link">Consultar Citas</Link></li>
                    <li><Link to="/crear" className="sidebar-link">Crear Cita</Link></li>
                    <li><Link to="/actualizar" className="sidebar-link">Actualizar Cita</Link></li>
                    <li><Link to="/borrar" className="sidebar-link">Borrar Cita</Link></li>
                </ul>
            </nav>
        </aside>
    )
}