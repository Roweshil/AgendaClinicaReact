import { useAuth } from "../hooks/useAuth.js";

import { AdminDashboard } from "./admin/AdminDashboard.jsx";
import { MedicoDashboard } from "./medico/MedicoDashboard.jsx";
import { PublicDashboard } from "./PublicDashboard.jsx";
import { SplashScreen } from '../components/SplashScreen.jsx';


export function Dashboard() {
    const { user, loading } = useAuth()

    if (loading) return (<SplashScreen />)
    
    if (user === null) return <PublicDashboard />
    if(user.rol === 'admin') return <AdminDashboard />
    if(user.rol === 'medico') return <MedicoDashboard />
}



