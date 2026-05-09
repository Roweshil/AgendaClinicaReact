import { useEffect, useState, } from "react"

import { AuthContext } from "../hooks/useAuth.js"

export function AuthProvider ({ children }) {
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  const validate = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    credentials: "include"
                })
                if (res.ok) {
                    const data = await res.json()
                    setUser(data.user)
                }
            } catch {
                setUser(null)
            } finally {
                setLoading(false)  // pasa a false una sola vez, nunca vuelve a true
            }
      }
    
  const logout = async () => {
      try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
              method: "POST",
              credentials: "include"
          })
      } catch (error) {
          console.error(error)
      } finally {
          setUser(null)  // limpia el estado siempre, falle o no el backend
      }
  }

  useEffect(() => {
    validate()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, validate}}>
      {children}
    </AuthContext.Provider>
  )
}