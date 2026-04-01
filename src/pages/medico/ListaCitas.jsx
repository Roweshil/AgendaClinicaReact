import { useMedico } from '../../hooks/useMedico.js'

    


export function ListaCitas() {
    const { citas } = useMedico()


    return (
        <section className="medico-lista">
            <header >

                <p>Citas registradas: {citas.length}</p>
                <p>[ Filtros avanzados 🔎  ]</p> 
                <p>[ Hoy ] [ Mañana ] [ Esta semana ] [ Pendientes ] [ Confirmadas ] [ Paciente ]</p>
                
                <form action="buscador">
                    <input type="text" placeholder='Buscar cita...' />
                    <button>Buscar</button>
                </form>
            </header>
            <section className="medico-lista-citas">

                    {citas.map((cita) => (
                        <article key={cita.uuid} className="cita-card" >
                            <header>
                                <p className="cita-estado">Estado: {cita.estado}</p>
                            </header>

                            <section className="cita-info">
                                <p>Fecha de creacion: {cita.creacion} </p>
                                
                                <p>{cita.paciente}</p>
                                <p>Fecha: {cita.fecha} </p>
                                <p>Hora: {cita.hora}hrs</p>
                                <p>Motivo: {cita.motivo}</p>
                            </section>

                            <footer>
                                <button>Detalles</button>
                                <button>Editar</button>
                                <button>Borrar</button>
                            </footer>
                        </article>
                    ))}
            </section>
                
        </section>
    )
}