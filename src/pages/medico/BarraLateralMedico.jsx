export function BarraLateralMedico() {
    return (
        <aside className="sidebar">
            <h2>Mi sistema</h2>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/lista">Consultar Citas</a></li>
                    <li><a href="/crear">Crear Cita</a></li>
                    <li><a href="/actualizar">Actualizar Cita</a></li>
                    <li><a href="/borrar">Borrar Cita</a></li>
                </ul>
            </nav>
        </aside>
    )
}