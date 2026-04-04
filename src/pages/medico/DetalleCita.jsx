import { useAuth } from '../../hooks/useAuth.js'

export function DetalleCita() {
    const { user } = useAuth()
    return (
        <div className="detalle-cita">
            <h2>Bienvenido, {user?.nombre?.toUpperCase()} {user?.apellido?.toUpperCase()}</h2>
            <p>Aqui puedes gestionar tus citas.</p>

            <h1>AQUI TAMBIEN PONDRE ALGO EVENTUALMENTE</h1>
            <h1>=AREA EN CONSTRUCCION=</h1>
            <img src="https://media.tenor.com/BJ-9w-MUVCMAAAAM/tis100-sad.gif" alt="estoy trabajando en ello" />

        </div>
    )
}