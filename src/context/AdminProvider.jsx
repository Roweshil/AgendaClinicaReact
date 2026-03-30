import { useEffect, useState, } from "react"

import { useAuth } from "../hooks/useAuth.js"
import { AdminContext } from "../hooks/useAdmin.js"

export function AdminProvider ({ children }) {

  const { user, loading } = useAuth()
  const [medicos, setMedicos] = useState([])


  useEffect(() => {
    console.log('AdminProvider montado')
    if(loading || !user ) return

    const getMedicos = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/consulta/`, {
            credentials: "include"
        })

        if (res.ok) {
            const data = await res.json()
            setMedicos(data.medicos)
            
        } else {
            console.log("data.error")
        }
    }

    getMedicos()
  }, [user, loading])

  const agregarMedico = (nuevoMedico) => {
        setMedicos(prev => [...prev, nuevoMedico])  // formatea al agregar
    }

  return (
    <AdminContext.Provider value={{ medicos, setMedicos, agregarMedico }}>
      {children}
    </AdminContext.Provider>
  )
}