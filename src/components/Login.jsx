import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from 'react-router-dom'
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export function Login() {
  const [confirmar, setConfirmar] = useState(false)
  const { validate } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
        navigate('/')
      }
    } catch (error) {
      console.error(error, 'login')
      alert("Servidor no disponible intente mas tarde")
    }
    
  }

  return (
    <>
      <button onClick={() => setConfirmar(true)} className="button-1">INICIAR SESION</button>

      {createPortal(
        <AnimatePresence>
          {confirmar && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="modal modal-login"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <form onSubmit={handleSubmit} className="modal-login-form">
                  
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


                    <button type="submit" className="button-1 modal-button-login">Entrar</button>
                </form>

                <button className="button-2 modal-button-login"onClick={() => setConfirmar(false)}>Cancelar</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // ← se renderiza directo en el body, fuera de la tarjeta
      )}
    </>
  )
}