import { useAdmin } from '../../hooks/useAdmin.js'
import { useState } from 'react'

export function CrearMedico() {

    const { agregarMedico } = useAdmin()

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

    const crearMedico = async (e) => {
        e.preventDefault()

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/crear`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
            })

            if(res.ok) {
                const nuevoMedico = await res.json()
                agregarMedico(nuevoMedico) // Agrega el nuevo medico al contexto
            console.log("Medico creado")
        }
        
    }

    return (
        <form onSubmit={crearMedico}>

            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
            <input name="telefono" type="number" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            <button type="submit">
                Alta de medico
            </button>

        </form>
    )
}