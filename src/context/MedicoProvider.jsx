import { useEffect, useState, } from "react"
import { MedicoContext } from "../hooks/useMedico.js"
import { useAuth } from "../hooks/useAuth.js"


export function MedicoProvider ({ children }) {
    
    const { user, loading } = useAuth()
    const [citas, setCitas] = useState([])

    useEffect(() => {
        
        if(loading || !user ) return
        
        const getCitas = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/medico/citas/mis-citas/`, {
                credentials: "include"
            })

            if (res.ok) {
                const data = await res.json()
                setCitas(data.citas) 
            } else {
                console.log("data.error")
            }
        }
        getCitas()
    }, [user, loading])

    const agregarCita = (nuevaCita) => {
        setCitas(prev => [...prev, nuevaCita])  // formatea al agregar
    }

  return (
    <MedicoContext.Provider value={{ citas, setCitas, agregarCita }}>
      {children}
    </MedicoContext.Provider>
  )
}