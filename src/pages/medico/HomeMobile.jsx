import { useAuth } from '../../hooks/useAuth.js'
import { useMedico } from '../../hooks/useMedico.js'

export function HomeMobile() {

    const {user} = useAuth()
    const { citas } = useMedico()

    const nombreCliente = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1);

    const apellidoCliente = user.apellido.charAt(0).toUpperCase() + user.apellido.slice(1); 

    const hoy = new Date().toLocaleDateString('en-CA')
    const horaActual = new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    })

    const proximasCitas = citas
    .filter(c => c.estado === 'pendiente' || c.estado === 'confirmada')
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))
    .slice(0, 3)

    const siguienteCita = proximasCitas[0]

    const citaHoy = citas
    .filter(c => {
        if (c.estado !== 'pendiente' && c.estado !== 'confirmada') return false
        if (c.fecha !== hoy) return false       // solo de hoy
        return c.hora > horaActual              // y que no haya pasado
    })
    .sort((a, b) => a.hora.localeCompare(b.hora)) // solo ordena por hora
 
    const siguienteCitaHoy = citaHoy[0] // solo siguiente cita inmediata de cualquier dia

    const citasConfirmadas = citas
    .filter(c => c.estado === 'confirmada') 

    const citasVencidas = citas.filter(c => c.estado === 'vencida')

    const citasCanceladas = citas
    .filter(c => c.estado === 'confirmada')

    return(
                <div className="home">
                <p className="home__name">¡Qué gusto verte {nombreCliente} {apellidoCliente}!</p>
                { siguienteCitaHoy ? (
                    <section className="home__header">

                        <article className="home__alert">
                            <div className="home__count">
                                <h2>{citaHoy.length} {citaHoy.length === 1 ? 'cita programada' : 'citas programadas'}</h2>
                                <p>Tienes una jornada activa hoy.</p>
                            </div>
                            <div>
                                <span className="label-today">HOY</span>
                            </div>
                        </article>
                        <article className="siguiente-cita">
                            
                            <p className="siguiente-cita__title">PROXIMA CITA</p>
                            <div className="siguiente-cita__card">
                                <span>
                                    <p className="siguiente-cita__hora">{siguienteCita.hora}</p>
                                </span>
                                <p className="siguiente-cita__hora">{siguienteCita.paciente}</p>
                            </div>
                        </article>
                    </section>
                ) : (
                    <section className="home__header">
                        <article className="home__alert">
                            <div>
                                <h2>No hay citas registradas para hoy</h2>
                            </div>
                        </article>
                        {siguienteCita ? (
                        <article className="siguiente-cita">
                            <p className="siguiente-cita__title">PROXIMA CITA</p>
                            <div className="siguiente-cita__card">
                                <span>
                                    <p className="siguiente-cita__hora">{siguienteCita.fecha}</p>
                                    <p className="siguiente-cita__hora">{siguienteCita.hora}</p>
                                </span>
                                <p className="siguiente-cita__hora">{siguienteCita.paciente}</p>
                            </div>
                        </article>
                        ) : (
                            <article className="siguiente-cita">
                                <p className="siguiente-cita__hora">Agenda una cita para comenzar.</p>
                            </article>
                        )}
                    </section>
                )}

            <section className="notifications">
                <article className="notifications_cards">
                    <p>Confirmadas</p>
                    <h3 className="notification_confirmadas">{citasConfirmadas.length}</h3>
                </article>
                <article className="notifications_cards">
                    <p>Vencidas</p>
                    <h3 className="notification_vencidas">{citasVencidas.length}</h3>
                </article>
                <article className="notifications_cards">
                    <p>Canceladas</p>
                    <h3 className="notification_canceladas">{citasCanceladas.length}</h3>
                </article>
            </section>   
            {proximasCitas.length > 0 ? (
                <section className="schedule">                 
                    <h2>Citas proximas</h2>
                        <ul>
                            {proximasCitas.map(cita => (
                            <li key={cita.uuid} className="schedule__card">
                                <div className="schedule__data">
                                <p className="schedule__info">{cita.fecha}</p>
                                <p className="schedule__info">{cita.hora}</p>
                                </div>
                                <p className="schedule__info">{cita.paciente}</p>
                            </li>
                            ))}
                        </ul>
                         
                </section>
            ) : (
                <section className="schedule">                 
                    <h2>Citas proximas</h2>
                    <p>No hay citas próximas</p>
                </section>
            )}
            <section className="news">
                    <p>promociones</p>
            </section>       
        </div>
    )
}