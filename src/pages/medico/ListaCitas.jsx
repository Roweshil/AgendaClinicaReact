
import { useAuth } from '../../hooks/useAuth.js'
import { useMedico } from '../../hooks/useMedico.js'

    


export function ListaCitas() {

    const { user } = useAuth()
    const { citas } = useMedico()


    return (
        <div>
            <h1>Lista de Médicos</h1>
            <article>
                        <h2>Bienvenido a la Agenda Clinica RoweApps {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h2>
                        <h3>Citas registradas: {citas.length}</h3>
                        <ul>
                            {citas.map((cita) => (
                            <li key={cita.uuid}> {cita.paciente} {cita.email} {cita.fecha} {cita.hora} {cita.motivo} {cita.estado}{cita.creacion}</li>
                            ))}
                        </ul>
                        <button>
                            Recargar citas DEPRECATED
                        </button>
                        
            </article>
        </div>
    )
}