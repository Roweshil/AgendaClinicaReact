import { useEffect, useState, } from "react"

import { AuthContext } from "../hooks/useAuth.js"

export function AuthProvider ({ children }) {
  
  const [user, setUser] = useState(null)


  useEffect(() => {
    const validate = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: "include"
      })

      const data = await res.json()
      if (data.user) {
        setUser(data.user)
      }
    }

    validate()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}