import { useEffect, useState, } from "react"

import { AuthContext } from "../hooks/useAuth.js"

export function AuthProvider ({ children }) {
  
  const [user, setUser] = useState(null)


  useEffect(() => {
    const validate = async () => {
      const res = await fetch("http://localhost:3050/api/auth/me", {
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