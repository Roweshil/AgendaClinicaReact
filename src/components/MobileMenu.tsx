import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface MenuItem {
    label: string
    to: string
}

interface MobileMenuProps {
    items?: MenuItem[]
}

const defaultItems: MenuItem[] = [
    { label: 'INICIO', to: '/' },
    { label: 'SERVICIOS', to: '/servicios' },
    { label: 'PORTAFOLIO', to: '/portafolio' },
]

export function MobileMenu({ items = defaultItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // cierra al hacer click fuera del menú
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                !buttonRef.current?.contains(target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <div className='mobile-menu'>
            <button
                ref={buttonRef}
                type='button'
                className='mobile-menu__toggle'
                aria-expanded={isOpen}
                aria-controls='mobile-menu_panel'
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className={`mobile-menu__bar ${isOpen ? 'is-open' : ''}`} />
                <span className={`mobile-menu__bar ${isOpen ? 'is-open' : ''}`} />
                <span className={`mobile-menu__bar ${isOpen ? 'is-open' : ''}`} />
            </button>

            <div
                ref={menuRef}
                id='mobile-menu_panel'
                className={`mobile-menu__panel ${isOpen ? 'is-open' : ''}`}
            >
                <ul className='mobile-menu__lista'>
                    {items.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className='mobile-menu__link'
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
