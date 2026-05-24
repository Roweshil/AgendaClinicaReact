import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { HomeDesktop } from './HomeDesktop.jsx'
import { HomeMobile } from './HomeMobile.jsx'

export function Home() {

    const isMobile = useMediaQuery('(max-width: 480px)')

    return (
         isMobile ? <HomeMobile /> : <HomeDesktop />
    )
}