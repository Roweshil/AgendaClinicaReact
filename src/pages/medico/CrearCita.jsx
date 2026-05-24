import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { CrearCitaMobile } from './CrearCitaMobile.jsx'
import { CrearCitaDesktop } from './CrearCitaDesktop.jsx'

export function CrearCita() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <CrearCitaMobile /> : <CrearCitaDesktop />
    )
}