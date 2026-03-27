import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin.js'


export function ActualizarMedico() {
    const { medicos, setMedicos } = useAdmin()
    const [medicoEditando, setMedicoEditando] = useState(null)

    const [formData, setFormData] = useState({
        nombre: '', 
        apellido: '',
        telefono: '',
        email: '', 
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEditar = (medico) => {
        setMedicoEditando(medico.id)
        setFormData({ nombre: medico.nombre, apellido: medico.apellido, telefono: medico.telefono, email: medico.email })
    }

    const handleCancelar = () => {
        setMedicoEditando(null)
        setFormData({ nombre: '', apellido: '', telefono: '', email: '' })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (medicoEditando) {
            // actualizar medico existente
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medicos/${medicoEditando}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setMedicos(prev => prev.map(m =>
                    m.id === medicoEditando ? { id: medicoEditando, ...formData } : m
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
                const nuevoMedico = await res.json()
                setMedicos(prev => [...prev, nuevoMedico])
                handleCancelar()
            }
        }
    }

    return (
        <div>
            <h3>Actualizar Medico</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="nombre" value={formData.nombre} onChange={handleChange} />
                    <input name="apellido" value={formData.apellido} onChange={handleChange} />
                    <input name="telefono" value={formData.telefono} onChange={handleChange} />
                    <input name="email" value={formData.email} onChange={handleChange} />
                    
                    
                    <button type="submit">
                        {medicoEditando ? 'Actualizar' : 'Crear'}  {/* cambia el texto solo */}
                    </button>
                    
                    {medicoEditando && (
                        <button type="button" onClick={handleCancelar}>Cancelar</button>
                    )}
                </form>

                {medicos.map(medico => (
                    <div key={medico.id}>
                        <span>{medico.nombre} {medico.apellido}</span>
                        <button onClick={() => handleEditar(medico)}>Editar</button>
                    </div>
                ))}
                </div>
        </div>
    )
}