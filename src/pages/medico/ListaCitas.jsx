import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { ListaCitasMobile } from './ListaCitasMobile.jsx'
import { ListaCitasDesktop } from './ListaCitasDesktop.jsx'

export function ListaCitas() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <ListaCitasMobile /> : <ListaCitasDesktop />
    )
}