import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { useMedico } from '../../hooks/useMedico.js'

export function CrearCita() {

    const navigate = useNavigate()
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
            alert("Cita creada exitosamente")
            navigate('/lista')
        } else {
            alert("Cita duplicada")
        }
        
    }

    return (
        <section className="crear-cita">
            <article  className="cita-card" >
                <form onSubmit={crearCita}>
                    <header>
                        <p className="cita-estado">Estado: Pendiente </p>
                    </header>

                    <section className="cita-info">
                        
                        <p>Informacion de la cita:  </p>
                        
                        <p>Paciente: <input name="paciente" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} /></p>
                        <p>Telefono: <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} /></p>
                        <p>Fecha: <input name="fecha"    placeholder="Fecha"    value={formData.fecha}    onChange={handleChange} type="date" />  </p>
                        <p>Hora:<input name="hora" placeholder="Hora" value={formData.hora}     onChange={handleChange} type="time" /></p>
                        <p>Motivo: <input name="motivo" placeholder="Motivo" value={formData.motivo}     onChange={handleChange} /></p>
                        
                        
                    </section>

                    <footer>
                        <button type="submit">Crear cita</button>
                        <button type="button" onClick={() => navigate(`/lista`)} >Cancelar</button>
                        
                    </footer>
                    </form>
            </article>
        </section>
    )
}