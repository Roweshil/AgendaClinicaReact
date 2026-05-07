import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useMedico } from "../../hooks/useMedico.js"

export function BotonEliminar({ uuid }) {
  const { setCitas } = useMedico()
  const [confirmar, setConfirmar] = useState(false)

  const handleBorrar = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/medico/citas/eliminar/${uuid}`,
      { method: 'DELETE', credentials: 'include' }
    )

    if (res.ok) {
      setCitas(prev => prev.filter(c => c.uuid !== uuid))
      setConfirmar(false)
    }
  }

    return (
    <>
      <button onClick={() => setConfirmar(true)} className="cita-card-button-3">Eliminar</button>

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
                className="modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <p>¿Eliminar esta cita?</p>
                <button className="btn-confirmar" onClick={handleBorrar}>Confirmar</button>
                <button className="btn-cancelar"onClick={() => setConfirmar(false)}>Cancelar</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // ← se renderiza directo en el body, fuera de la tarjeta
      )}
    </>
  )
}