import { useAuth } from "../hooks/useAuth.js";
import { AdminDashboard } from "./admin/AdminDashboard.jsx";
import { MedicoDashboard } from "./medico/MedicoDashboard.jsx";
import { PublicDashboard } from "./PublicDashboard.jsx";

export function Dashboard() {
    const { user, loading } = useAuth()

    if (loading) return null
    
    if (user === null) return <PublicDashboard />
    if(user.rol === 'admin') return <AdminDashboard />
    if(user.rol === 'medico') return <MedicoDashboard />
}