import { useState } from 'react'

import { useMedico } from '../../hooks/useMedico.js'

export function CrearCita() {

    const { agregarCita } = useMedico()

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

    const crearCita = async (e) => {
        e.preventDefault()

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medico/citas/crear`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(res.ok) {
            const nuevaCita = await res.json()
            agregarCita(nuevaCita)  // Agrega la nueva cita al contexto 
            console.log("Cita creada exitosamente")
        }
        
    }

    return (
        <form onSubmit={crearCita}>

            <input name="paciente" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} />
            <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            <input name="fecha"    placeholder="Fecha"    value={formData.fecha}    onChange={handleChange} type="date" />
            <input name="hora" placeholder="Hora" value={formData.hora}     onChange={handleChange} type="time" />
            <input name="motivo" placeholder="Motivo" value={formData.motivo}     onChange={handleChange} />

            <button type="submit">
                Crear cita
            </button>

        </form>
    )
}