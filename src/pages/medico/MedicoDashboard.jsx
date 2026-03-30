import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'
import { AnimatePresence } from 'framer-motion'

import { ListaCitas } from './ListaCitas.jsx'
import { CrearCita } from './CrearCita.jsx'
import { BorrarCita } from './BorrarCita.jsx'
import { BarraLateralMedico } from './BarraLateralMedico.jsx'
import { ActualizarCita } from './ActualizarCita.jsx'
import { MedicoProvider } from '../../context/MedicoProvider.jsx'
import { PageTransition } from '../../components/PageTransition.jsx'

export function MedicoDashboard() {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <MedicoProvider>
            { user ? (
                <>
                    <div className="medico-dashboard">
                        <BarraLateralMedico />
                        <section className="content">
                            <h1>Bienvenido, {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h1>
                            <p>Aqui puedes gestionar tus consultas y pacientes.</p>
                            <AnimatePresence mode="wait">
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<h1>Sobre nosotros</h1>} />
                                    <Route path="/lista" element={<PageTransition><ListaCitas /></PageTransition>} />
                                    <Route path="/crear" element={<PageTransition><CrearCita /></PageTransition>} />
                                    <Route path="/actualizar" element={<PageTransition><ActualizarCita /></PageTransition>} />
                                    <Route path="/borrar" element={<PageTransition><BorrarCita /></PageTransition>} />
                                </Routes>
                            </AnimatePresence>
                        </section> 
                    </div> 
                </>  
            ) : (
                    <>
                        
                        <p>No has iniciado sesión mongolo</p>
                    </>
                )}
        </MedicoProvider>                
    )
}