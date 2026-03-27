import { useEffect, useState, } from "react"

import { AdminContext } from "../hooks/useAdmin.js"

export function AdminProvider ({ children }) {
  
  const [medicos, setMedicos] = useState([])


  useEffect(() => {
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
  }, [])

  return (
    <AdminContext.Provider value={{ medicos, setMedicos }}>
      {children}
    </AdminContext.Provider>
  )
}