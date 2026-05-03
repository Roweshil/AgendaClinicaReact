import { useAuth } from '../../hooks/useAuth.js'

export function Home() {
    const { user } = useAuth()
    return (
        <div className="section--medico-home">

            <section className="section--medico-home-header">
                <article className="section--medico-home-alert">
                    <div className="section--medico-home-alert-count">
                        <h2>08 citas <br />programadas</h2>
                        <p>Tienes una jornada activa hoy.</p>
                    </div>
                    <div className="section--medico-home-alert-today">
                        HOY
                    </div>
                </article>
                <article className="section--medico-home-next">
                    <div>
                        <p className="section--medico-home-next-title">PROXIMA CITA</p>
                        <p className="section--medico-home-next-hour">10:30 AM</p>
                    </div>
                    <div>
                        <p>Mariana Rojas</p>
                    </div>
                </article>
            </section>
            <section className="section--medico-home-notifications">
                <article className="section--medico-home-cards">
                    <p>Pendientes</p>
                    <h3 className="section--medico-home-cards-count">08</h3>
                </article>
                <article className="section--medico-home-cards">
                    <p>Confirmadas</p>
                    <h3 className="section--medico-home-cards-count">04</h3>
                </article>
                <article className="section--medico-home-cards">
                    <p>Seguimiento</p>
                    <h3 className="section--medico-home-cards-count">02</h3>
                </article>
            </section>
            <section className="section--medico-schedule">
                    <h2>Agenda de hoy</h2>
                    <ul>
                        <li className="section--medico-schedule-card">
                            <div className="section--medico-schedule-card-data">
                                <p>10:30</p> 
                                <p> Mariana Rojas</p>
                            </div>
                            <div className="section--medico-schedule-card-status">
                                <p>Confirmada</p>
                            </div>
                        </li>
                        <li className="section--medico-schedule-card">
                            <div className="section--medico-schedule-card-data">
                                <p>12:15 </p>
                                <p>Daniel Perez</p>
                            </div>
                            <div className="section--medico-schedule-card-status">
                                <p>Pendiente</p>
                            </div>
                        </li>
                        <li className="section--medico-schedule-card">
                            <div className="section--medico-schedule-card-data">
                                <p>12:15 </p>
                                <p>Daniel Perez</p>
                            </div>
                            <div className="section--medico-schedule-card-status">
                                <p>Pendiente</p>
                            </div>
                        </li>
                    </ul>
            </section>
            <section className="section--medico-home-news">
                    <p>promociones</p>
            </section>       
        </div>
    )
}