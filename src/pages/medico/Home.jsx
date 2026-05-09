import { useMedico } from '../../hooks/useMedico.js'

export function Home() {
    const { citas } = useMedico()

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

    const siguienteCitaHoy = citaHoy[0]

    const citasConfirmadas = citas
    .filter(c => c.estado === 'confirmada')

    const citasVencidas = citas.filter(c => c.estado === 'vencida')

    const citasCanceladas = citas
    .filter(c => c.estado === 'confirmada')

    return (
        <div className="section--medico-home">
                { siguienteCitaHoy ? (
                    <section className="section--medico-home-header">
                        <article className="section--medico-home-alert">
                            <div className="section--medico-home-alert-count">
                                <h2>{citaHoy.length} {citaHoy.length === 1 ? 'cita programada' : 'citas programadas'}</h2>
                                <p>Tienes una jornada activa hoy.</p>
                            </div>
                            <div className="section--medico-home-alert-today">
                                HOY
                            </div>
                        </article>
                        <article className="section--medico-home-next">
                            
                            <p className="section--medico-home-next-title">PROXIMA CITA</p>
                            <div>
                                <span>
                                    <p className="section--medico-home-next-hour">{siguienteCita.hora}</p>
                                </span>
                                <p className="section--medico-home-next-hour">{siguienteCita.paciente}</p>
                            </div>
                        </article>
                    </section>
                ) : (
                    <section className="section--medico-home-header">
                        <article className="section--medico-home-alert">
                            <div>
                                <h2>No hay citas registradas para hoy</h2>
                            </div>
                        </article>
                        {siguienteCita ? (
                        <article className="section--medico-home-next">
                            <p className="section--medico-home-next-title">PROXIMA CITA</p>
                            <div>
                                <span>
                                    <p className="section--medico-home-next-hour">{siguienteCita.fecha}</p>
                                    <p className="section--medico-home-next-hour">{siguienteCita.hora}</p>
                                </span>
                                <p className="section--medico-home-next-hour">{siguienteCita.paciente}</p>
                            </div>
                        </article>
                        ) : (
                            <article className="section--medico-home-next">
                                <div>
                                    Agenda una cita para comenzar.
                                </div>
                            </article>
                        )}
                    </section>
                )}

            <section className="section--medico-home-notifications">
                <article className="section--medico-home-cards section--medico-home-cards-confirmadas">
                    <p>Confirmadas</p>
                    <h3 className=" section--medico-home-cards-count-confirmadas">{citasConfirmadas.length}</h3>
                </article>
                <article className="section--medico-home-cards section--medico-home-cards-vencidas">
                    <p>Vencidas</p>
                    <h3 className=" section--medico-home-cards-count-vencidas">{citasVencidas.length}</h3>
                </article>
                <article className="section--medico-home-cards section--medico-home-cards-canceladas">
                    <p>Canceladas</p>
                    <h3 className=" section--medico-home-cards-count-canceladas">{citasCanceladas.length}</h3>
                </article>
            </section>
            {proximasCitas.length > 0 ? (
                <section className="section--medico-schedule">                 
                    <h2>Citas proximas</h2>
                        <ul>
                            {proximasCitas.map(cita => (
                            <li key={cita.uuid} className="section--medico-schedule-card">
                                <div className="section--medico-schedule-card-data">
                                <p>{cita.fecha}</p>
                                <p>{cita.hora}</p>
                                </div>
                                <p>{cita.paciente}</p>
                            </li>
                            ))}
                        </ul>
                         
                </section>
            ) : (
                <section className="section--medico-schedule">                 
                    <h2>Citas proximas</h2>
                    <p>No hay citas próximas</p>
                </section>
            )}
            <section className="section--medico-home-news">
                    <p>promociones</p>
            </section>       
        </div>
    )
}