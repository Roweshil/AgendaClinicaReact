import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'
import { AnimatePresence } from 'framer-motion'

import { AdminProvider } from '../../context/AdminProvider.jsx'
import { BarraLateralAdmin } from './BarraLateralAdmin.jsx'
import { ListaMedicos } from './ListaMedicos.jsx'
import { CrearMedico } from './CrearMedico.jsx'
import { ActualizarMedico } from './ActualizarMedico.jsx'
import { BorrarMedico } from './BorrarMedico.jsx'
import { PageTransition } from '../../components/PageTransition.jsx'

export function AdminDashboard() {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <AdminProvider>
            { user ? (
                <main className="admin-dashboard">
                    <BarraLateralAdmin />
                    <section className="content">
                        <h1>Bienvenido, {user.nombre}!</h1>
                        <p>Aqui puedes gestionar medicos registrados.</p>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<PageTransition><h1>Sobre nosotros</h1></PageTransition>} />
                                <Route path="/lista" element={<PageTransition><ListaMedicos /></PageTransition>} />
                                <Route path="/crear" element={<PageTransition><CrearMedico /></PageTransition>} />
                                <Route path="/actualizar" element={<PageTransition><ActualizarMedico /></PageTransition>} />
                                <Route path="/borrar" element={<PageTransition><BorrarMedico /></PageTransition>} />
                            </Routes>
                        </AnimatePresence>
                    </section> 
                </main>   
            ) : (
                    <>
                        <p>No has iniciado sesión mongolo</p>
                    </>
                )}
        </AdminProvider>
    )
}