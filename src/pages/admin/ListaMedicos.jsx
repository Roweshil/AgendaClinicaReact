import { useAdmin } from '../../hooks/useAdmin.js'
import { useAuth } from '../../hooks/useAuth.js'
    


export function ListaMedicos() {

    const { user } = useAuth()
    const { medicos } = useAdmin()

    return (
        <div>
            <h1>Lista de Médicos</h1>
            <article>
                        <h2>Bienvenido a la Agenda Clinica RoweApps {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h2>
                        <h3>Medicos registrados: {medicos.length}</h3>
                        <ul>
                            {medicos.map((medico, index) => (
                            <li key={index}>id: {medico.id } Nombre: {medico.nombre} {medico.apellido} {medico.telefono} {medico.email} {index}</li>
                            ))}
                        </ul>
                        <button>
                            Recargar medicos DEPRECATED
                        </button>
                        
            </article>
        </div>
    )
}