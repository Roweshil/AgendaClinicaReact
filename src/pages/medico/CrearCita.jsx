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
        <section className="section--crear-cita">
            <section className="section--crear-cita-header">
                <article>
                    <h1>Registra una nueva cita</h1>
                </article>
                <article className="section--crear-cita-status">
                    <p>Estado inicial</p>
                    <h2>Pendiente</h2>
                    <p>La cita aparecera en la agenda una vez guardada</p>
                </article>
            </section>
            <article  className="section--crear-cita-card" >
                <form onSubmit={crearCita}>
                    <header>
                        <h2>Datos de la cita</h2>
                    </header>

                    <section className="section--crear-cita-info">
                        <div>
                            <p>Paciente:</p> 
                            <input name="paciente" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} />
                        </div>
                        <div>
                            <p>Telefono: </p>
                            <input name="telefono" placeholder="0000000000" value={formData.telefono} onChange={handleChange} />
                        </div>
                        <div>
                            <p>Fecha: </p>
                            <input name="fecha"    placeholder="Fecha"    value={formData.fecha}    onChange={handleChange} type="date" /> 
                        </div>
                        <div>
                            <p>Hora:</p>
                            <input name="hora" placeholder="Hora" value={formData.hora}     onChange={handleChange} type="time" />
                        </div>
                        <div>
                            <p>Motivo:</p> 
                            <input name="motivo" placeholder="Describe el motivo principal de consulta" value={formData.motivo}     onChange={handleChange} />
                        </div> 
                    </section>

                    <footer>
                        <button type="submit" className="button-1">Crear cita</button>
                        <button type="button" onClick={() => navigate(`/lista`)} className="button-2">Cancelar</button>
                    </footer>
                </form>
            </article>
        </section>
    )
}