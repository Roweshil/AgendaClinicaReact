import { Link } from 'react-router-dom'

export function BarraLateralAdmin() {
    return (
        <aside className="sidebar">
            <h2>Mi sistema</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/lista">Lista de Medicos</Link></li>
                    <li><Link to="/crear">Crear Registro</Link></li>
                    <li><Link to="/actualizar">Actualizar Registro</Link></li>
                    <li><Link to="/borrar">Borrar Registro</Link></li>
                </ul>
            </nav>
        </aside>
    )
}