import { useEffect, useState, } from "react"
import { formatDate } from "../utils/formatDate.js"
import { MedicoContext } from "../hooks/useMedico.js"
import { useAuth } from "../hooks/useAuth.js"

const formatCita = (cita) => ({
    ...cita,
    fecha: formatDate(cita.fecha),
    creacion: formatDate(cita.creacion)
})

export function MedicoProvider ({ children }) {
    
    const { user, loading } = useAuth()
    const [citas, setCitas] = useState([])

    useEffect(() => {
        console.log("MedicoProvider montado")
        
        if(loading || !user ) return
        
        const getCitas = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medico/citas/mis-citas/`, {
                credentials: "include"
            })

            if (res.ok) {
                const data = await res.json()
                setCitas(data.citas.map(formatCita)) 
            } else {
                console.log("data.error")
            }
        }
        getCitas()
    }, [user, loading])

    const agregarCita = (nuevaCita) => {
        setCitas(prev => [...prev, formatCita(nuevaCita)])  // formatea al agregar
    }

  return (
    <MedicoContext.Provider value={{ citas, setCitas, agregarCita }}>
      {children}
    </MedicoContext.Provider>
  )
}