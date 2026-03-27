import { useMedico } from '../../hooks/useMedico.js'

export function BorrarCita() {

    const { citas, setCitas } = useMedico()

    const borrarCita = async (id) => {
        const res = await fetch(`http://localhost:3050/api/medico/citas/eliminar/${id}` , {
            method: "DELETE",
            credentials: "include"
        })

        if (res.ok) {
         setCitas(prev => prev.filter(cita => cita.id !== id))
         console.log("Cita eliminada")
        } else {
        console.log("data.error")
        }
    }


    return (
        <div>
            <h2>Lista de Citas</h2>
            <div>
                {citas.map(cita => (
                    <div key={cita.uuid} >
                        <span> {cita.paciente} {cita.email} {cita.fecha} {cita.hora} {cita.motivo} {cita.estado}{cita.creacion} </span>
                        <button onClick={() => borrarCita(cita.uuid)}>
                            Borrar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}