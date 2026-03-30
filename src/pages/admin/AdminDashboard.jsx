import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'
import { AnimatePresence } from 'framer-motion'

import { AdminProvider } from '../../context/AdminProvider.jsx'
import { BarraLateralAdmin } from './BarraLateralAdmin.jsx'
import { ListaMedicos } from './ListaMedicos.jsx'
import { CrearMedico } from './CrearMedico.jsx'
import { ActualizarMedico } from './ActualizarMedico.jsx'
import { BorrarMedico } from './BorrarMedico.jsx'

export function AdminDashboard() {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <AdminProvider>
            { user ? (
                <div className="admin-dashboard">
                    <BarraLateralAdmin />
                    <section className="content">
                        <h1>Bienvenido, {user.nombre}!</h1>
                        <p>Aqui puedes gestionar medicos registrados.</p>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<h1>Sobre nosotros</h1>} />
                                <Route path="/lista" element={<ListaMedicos />} />
                                <Route path="/crear" element={<CrearMedico />} />
                                <Route path="/actualizar" element={<ActualizarMedico />} />
                                <Route path="/borrar" element={<BorrarMedico />} />
                            </Routes>
                        </AnimatePresence>
                    </section> 
                </div>   
            ) : (
                    <>
                        <p>No has iniciado sesión mongolo</p>
                    </>
                )}
        </AdminProvider>                
    )
}