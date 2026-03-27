import { useAdmin } from '../../hooks/useAdmin.js'

export function BorrarMedico() {

    const { medicos, setMedicos } = useAdmin()

    const borrarMedico = async (id) => {
        const res = await fetch(`http://localhost:3050/api/admin/borrar/${id}` , {
            method: "DELETE",
            credentials: "include"
        })

        if (res.ok) {
            setMedicos(prev => prev.filter(medico => medico.id !== id))
            alert("Medico eliminado")
        } else {
            
            alert("Error al eliminar el medico")
        }
    }


    return (
        <div>
            <h2>Lista de Médicos</h2>
            <div>
                {medicos.map(medico => (
                    <div key={medico.id} >
                        <span> {medico.nombre} {medico.apellido} {medico.email} </span>
                        <button onClick={() => borrarMedico(medico.id)}>
                            Borrar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}