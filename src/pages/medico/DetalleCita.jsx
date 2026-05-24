import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { DetalleCitaDesktop } from './DetalleCitaDesktop.jsx'
import { DetalleCitaMobile } from './DetalleCitaMobile.jsx'

export function DetalleCita() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <DetalleCitaMobile /> : <DetalleCitaDesktop />
    )
}