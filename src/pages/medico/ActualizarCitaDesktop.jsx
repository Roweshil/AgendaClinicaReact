import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useMedico } from '../../hooks/useMedico.js'
import { useSearchParams } from "react-router-dom"

export function ActualizarCitaDesktop() {

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
            estado: ''
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
        <section className="actualizar-cita">
            <header  className="actualizar-cita__header">
                <h1>Actualización de cita</h1>

            </header>


            <article  className="actualizar-cita__card" >
                <form onSubmit={handleSubmit}>

                    <section className="actualizar-cita__card">
                        <header>Informacion de la cita:  </header>
                        <section className="actualizar-info">
                            <div>
                                <p>Paciente:</p> 
                                <input name="paciente" placeholder="Nombre del paciente" value={formData.paciente} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Telefono:</p>
                                <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
                            </div>
                            <span>
                                <div>
                                    <p>Fecha: </p>
                                    <input name="fecha"    placeholder="Fecha"    value={formData.fecha} onChange={handleChange} type="date" />  
                                </div>
                                <div>
                                    <p>Hora:</p><input name="hora" placeholder="Hora" value={formData.hora} onChange={handleChange} type="time" />
                                </div>
                            </span>
                            <div>
                                <p>Motivo:</p>
                                <input name="motivo" placeholder="Motivo" value={formData.motivo} onChange={handleChange} />
                            </div>
                            <div>
                                <p> Estatus: </p>
                                <select name="estado" value={formData.estado} onChange={handleChange}>
                                    <option value="" disabled>Selecciona un estado</option>
                                    <option value="confirmada"> Confirmada </option>
                                    <option value="cancelada"> Cancelada </option>
                                </select>
                            </div>

                        </section>

                    
                    </section>

                    <footer className="actualizar-cita__footer">
                        <button type="submit" className="btn btn--primario">Guardar</button>
                        
                        <button type="button" onClick={() => navigate(`/lista`)} className="btn btn--secundario">Cancelar</button>
                    </footer>
                </form>
            </article>
        </section>
    )
}