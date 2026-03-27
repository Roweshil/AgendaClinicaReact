
import { Routes, Route } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'
import { AdminProvider } from '../../context/AdminProvider.jsx'

import { BarraLateralAdmin } from './BarraLateralMedico.jsx'
import { ListaMedicos } from './ListaCitas.jsx'
import { CrearMedico } from './CrearCita.jsx'
import { ActualizarMedico } from './ActualizarCita.jsx'
import { BorrarMedico } from './BorrarCita.jsx'

export function AdminDashboard() {

    const { user } = useAuth()

    return (
        <AdminProvider>
            { user ? (
                <div className="admin-dashboard">
                    <BarraLateralAdmin />
                    <section className="content">
                        <h1>Bienvenido, Médico!</h1>
                        <p>Aqui puedes gestionar tus consultas y pacientes.</p>
                        <Routes>
                            <Route path="/" element={<h1>Sobre nosotros</h1>} />
                            <Route path="/lista" element={<ListaMedicos />} />
                            <Route path="/crear" element={<CrearMedico />} />
                            <Route path="/actualizar" element={<ActualizarMedico />} />
                            <Route path="/borrar" element={<BorrarMedico />} />
                        </Routes>
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