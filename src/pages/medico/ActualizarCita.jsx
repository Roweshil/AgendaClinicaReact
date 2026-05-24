import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { ActualizarCitaDesktop } from './ActualizarCitaDesktop.jsx'
import { ActualizarCitaMobile } from './ActualizarCitaMobile.jsx'

export function ActualizarCita() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <ActualizarCitaMobile /> : <ActualizarCitaDesktop />
    )
}