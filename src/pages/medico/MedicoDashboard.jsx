import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'
import { AnimatePresence } from 'framer-motion'

import { ActualizarCita } from './ActualizarCita.jsx'
import { MedicoProvider } from '../../context/MedicoProvider.jsx'
import { PageTransition } from '../../components/PageTransition.jsx'

import { Home } from './Home.jsx'
import { ListaCitas } from './ListaCitas.jsx'
import { DetalleCita } from './DetalleCita.jsx'
import { CrearCita } from './CrearCita.jsx'
import { BarraLateralMedico } from './BarraLateralMedico.jsx'
import { NotFound } from './NotFound.jsx'




export function MedicoDashboard() {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <MedicoProvider>
            { user ? (
                <>
                    <main className="medico-dashboard">
                        <BarraLateralMedico />
                        <section className="medico-content">
                            <AnimatePresence mode="wait">
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/lista" element={<PageTransition><ListaCitas /></PageTransition>} />
                                    <Route path="/detalle" element={<PageTransition><DetalleCita /></PageTransition>} />
                                    <Route path="/crear" element={<PageTransition><CrearCita /></PageTransition>} />
                                    <Route path="/actualizar" element={<PageTransition><ActualizarCita /></PageTransition>} />
                                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                                </Routes>
                            </AnimatePresence>
                        </section> 
                    </main> 
                </>  
            ) : (
                    <>
                        
                        <p>No has iniciado sesión mongolo</p>
                    </>
                )}
        </MedicoProvider>                
    )
}