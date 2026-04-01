import { useState } from 'react'
import { useMedico } from '../../hooks/useMedico.js'


export function ActualizarCita() {

    const { citas, setCitas } = useMedico()
    const [citaEditando, setCitaEditando] = useState(null)

    const [formData, setFormData] = useState({
        paciente: '',
        telefono: '',
        fecha: '',
        hora: '',
        motivo: '',
        estado: 'confirmada'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEditar = (cita) => {
        setCitaEditando(cita.id)
        setFormData({ paciente: cita.paciente, telefono: cita.telefono, fecha: cita.fecha, hora: cita.hora, motivo: cita.motivo, estado: cita.estado })
    }

    const handleCancelar = () => {
        setCitaEditando(null)
        setFormData({ paciente: '', telefono: '', fecha: '', hora: '', motivo: '', estado: 'confirmada' })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (citaEditando) {
            // actualizar cita existente
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/citas/${citaEditando}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setCitas(prev => prev.map(m =>
                    m.id === citaEditando ? { id: citaEditando, ...formData } : m
                ))
                handleCancelar()
            }
        } else {
            // Crear medico nuevo si no existe ID
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medicos`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                const nuevaCita = await res.json()
                setCitas(prev => [...prev, nuevaCita])  // Agrega la nueva cita al contexto
                handleCancelar()
            }
        }
    }

    return (
        <div>
            <h3>Actualizar Citas</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="nombre" value={formData.paciente} onChange={handleChange} />
                    <input name="telefono" value={formData.telefono} onChange={handleChange} />
                    <input name="fecha" value={formData.fecha} onChange={handleChange} />
                    <input name="hora" value={formData.hora} onChange={handleChange} />
                    <textarea
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        rows={4}        // altura en líneas
                        cols={50}       // ancho en caracteres
                        placeholder="Describe el motivo de la consulta..."
                    />
                    <input name="estado" value={formData.estado} onChange={handleChange} />
                    
                    
                    
                    <button type="submit">
                        {citaEditando ? 'Actualizar' : 'Crear'}  {/* cambia el texto solo */}
                    </button>
                    
                    {citaEditando && (
                        <button type="button" onClick={handleCancelar}>Cancelar</button>
                    )}
                </form>

                {citas.map(cita => (
                    <div key={cita.uuid}>
                        <span>{cita.paciente} {cita.telefono} {cita.fecha} {cita.hora} {cita.motivo} {cita.estado}{cita.creacion}</span>
                        <button onClick={() => handleEditar(cita)}>Editar</button>
                    </div>
                ))}
                </div>
        </div>
    )
}