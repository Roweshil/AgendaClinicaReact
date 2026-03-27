import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from 'react-router-dom'

import { logError } from "../utils/logError.js"

export function Login() {

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const validate = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: "include"
      })

      const data = await res.json()
      if (data.user) {
        setUser(data.user)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
          email,
          password
        })
      })

      if(res.ok) {
        await validate() 
        console.log("Login exitoso")
        navigate('/')
      }
    } catch (error) {
      logError(error, 'login')
      alert("Servidor no disponible intente mas tarde")
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Login
      </button>

    </form>
  )
}