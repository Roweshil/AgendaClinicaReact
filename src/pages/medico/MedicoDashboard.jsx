import { Routes, Route } from 'react-router-dom'
import { useAuth} from '../../hooks/useAuth.js'

import { ListaCitas } from './ListaCitas.jsx'
import { MedicoProvider } from '../../context/MedicoProvider.jsx'
import { CrearCita } from './CrearCita.jsx'
import { BorrarCita } from './BorrarCita.jsx'
import { BarraLateralMedico } from './BarraLateralMedico.jsx'
import { ActualizarCita } from './ActualizarCita.jsx'

export function MedicoDashboard() {

    const { user } = useAuth()


    return (
        <MedicoProvider>
            { user ? (
                <div className="medico-dashboard">
                    <BarraLateralMedico />
                    <section className="content">
                        <h1>Bienvenido, {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h1>
                        <p>Aqui puedes gestionar tus consultas y pacientes.</p>
                        <Routes>
                            <Route path="/" element={<h1>Sobre nosotros</h1>} />
                            <Route path="/lista" element={<ListaCitas />} />
                            <Route path="/crear" element={<CrearCita />} />
                            <Route path="/actualizar" element={<ActualizarCita />} />
                            <Route path="/borrar" element={<BorrarCita />} />
                        </Routes>
                    </section> 
                </div>   
            ) : (
                    <>
                        
                        <p>No has iniciado sesión mongolo</p>
                    </>
                )}
        </MedicoProvider>                
    )
}