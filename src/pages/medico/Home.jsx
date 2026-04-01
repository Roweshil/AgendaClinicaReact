import { useAuth } from '../../hooks/useAuth.js'

export function Home() {
    const { user } = useAuth()
    return (
        <div className="medico-home">
            <h2>Bienvenido, {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h2>
            <p>Aqui puedes gestionar tus citas.</p>

            <h1>PONDRE ALGO CUANDO SE ME OCURRA</h1>
            <h1>=AREA EN CONSTRUCCION=</h1>

        </div>
    )
}