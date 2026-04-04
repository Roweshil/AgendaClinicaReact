import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useMedico } from '../../hooks/useMedico.js'
import { useSearchParams } from "react-router-dom"

export function ActualizarCita() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const uuidParam = searchParams.get("uuid")

    const { citas, setCitas } = useMedico()

    const [formData, setFormData] = useState({
        paciente: '',
        telefono: '',
        fecha: '',
        hora: '',
        motivo: '',
        estado: ''
    })

    useEffect(() => {
        if (uuidParam && citas.length > 0) {
        const cita = citas.find(c => c.uuid === uuidParam)
        if (cita) {
            setFormData({
            paciente: cita.paciente,
            telefono: cita.telefono,
            fecha: cita.fecha,
            hora: cita.hora,
            motivo: cita.motivo,
            estado: cita.estado
            })
        }
        }
    }, [uuidParam, citas])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === "telefono" ? String(value) : value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const body = {
            ...formData,
            telefono: String(formData.telefono) 
        }

        // actualizar cita existente
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medico/citas/actualizar/${uuidParam}`, 
            {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        )

        if (res.ok) {
            setCitas(prev => prev.map(c =>
                c.uuid === uuidParam ? { ...c, ...body } : c
            ))
            alert("Cita actualizada exitosamente")
            navigate('/lista')
            } else {
            const error = await res.json()
            console.log("error backend:", error)
        }
    }

    

    return (
        <section className="cita-card-actualizar">
            <article  className="cita-card" >
                <form onSubmit={handleSubmit}>
                    <header>
                        
                    </header>

                    <section className="cita-info">
                        <p>Informacion de la cita:  </p>
                        
                        <p>Paciente: <input name="paciente" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} /></p>
                        <p>Telefono: <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} /></p>
                        <p>Fecha: <input name="fecha"    placeholder="Fecha"    value={formData.fecha}    onChange={handleChange} type="date" />  </p>
                        <p>Hora:<input name="hora" placeholder="Hora" value={formData.hora}     onChange={handleChange} type="time" /></p>
                        <p>Motivo: <input name="motivo" placeholder="Motivo" value={formData.motivo}     onChange={handleChange} /></p>
                        <p> Estado: <select name="estado" value={formData.estado} onChange={handleChange}>
                                        <option value="confirmada"> Confirmada </option>
                                        <option value="cancelada"> Cancelada </option>
                                        <option value="vencida"> Vencida </option>
                                    </select>
                        </p>
                    
                    </section>

                    <footer>
                        <button type="submit">Guardar</button>
                        
                        <button type="button" onClick={() => navigate(`/lista`)} >Cancelar</button>
                    </footer>
                </form>
            </article>
        </section>
    )
}