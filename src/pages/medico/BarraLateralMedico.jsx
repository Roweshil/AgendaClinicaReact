import { NavLink } from "react-router-dom"
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { BarraLateralMedicoMobile } from "./BarraLateralMedicoMobile.jsx"
import { BarraLateralMedicoDesktop } from "./BarraLateralMedicoDesktop.jsx"


export function BarraLateralMedico() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <BarraLateralMedicoMobile /> : <BarraLateralMedicoDesktop />
    )
}