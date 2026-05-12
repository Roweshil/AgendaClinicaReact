export function PublicDashboard() {
    return (
        <>
            <section className="hero">
                <section className="hero__info">
                    <article>
                        <p className="hero__subtitle">Bienvenido a Agenda RoweWorks</p>
                        <h1 className="hero__title">Simplifica tus citas <br /> organiza tu vida.</h1>
                        <p className="hero__subtitle">Plataforma líder para gestionar agendas y reservas con la eficiencia que tu ritmo de vida exige.<br />Coordina tu agenda en segundos y ofrece una experiencia premium a tus clientes.</p>
                    </article>
                    <button className="btn btn--primario">Empezar a agendar</button>
                    <button className="btn btn--secundario">Ver Demo</button>
                </section>
                <section className="hero__image">
                    <img src="https://imgs.search.brave.com/esmgfGpNHMcWTHh7IZbOge9Yi-CL1RAA3k8gAgTVGA8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjQy/NjM5NTQvcGV4ZWxz/LXBob3RvLTI0MjYz/OTU0L2ZyZWUtcGhv/dG8tb2YtcGVyc29u/YS1tYW5vLXRlbGVm/b25vLWludGVsaWdl/bnRlLXRlY25vbG9n/aWEuanBlZz9hdXRv/PWNvbXByZXNzJmNz/PXRpbnlzcmdiJmRw/cj0xJnc9NTAw" alt="" />
                </section>
            </section>
            <section className="hero-banner">
                    <ul>
                        <li>
                            <p>99.9%</p>
                            <p>Uptime garantizado</p>
                        </li>
                        <li>
                            <p>1M+</p>
                            <p>Citas Gestionadas</p>
                        </li>
                        <li>
                            <p>24/7</p>
                            <p>Soporte Técnico</p>
                        </li>
                        <li>
                            <p>15 min</p>
                            <p>Configuracion Media</p>
                        </li>
                    </ul>
            </section>
            <section className="features">
                <article className="features__card--rapido">
                    <h2>Rápido</h2>
                    <p>Reserva en segundos sin esperas telefònicas ni procesos complejos. Eficienta en cada clic.</p>
                </article>
                <article className="features__card--seguro">
                    <h2>Seguro</h2>
                    <p>Tus datos están seguros y protegidos en todo momento.</p>
                </article>
                <article className="features__card--confiable">
                    <h2>Confiable</h2>
                    <p>Sincronización en tiempo real garantizada. Sin duplicidad de citas ni horarios cruzados. </p>
                </article>
            </section>
            <section className="features-desktop">
                <header className="features-desktop__header">
                    <div className="features-desktop__header-titles">
                        <p className="features-desktop__subtitle">Potencia tu Negocio</p>
                        <h2 className="features-desktop__title">Funcionalidades Avanzadas</h2>    
                    </div>
                    <div className="features-desktop__description">
                        <p>Diseñado para escalar con tus necesidades, desde emprendedores hasta grandes equipos.</p>
                    </div>
                </header>
                <section className="features-desktop__content">
                    <article className="features-desktop__card">
                        <h2>Sincronizacion en tiempo real.</h2>
                        <p>Olvida las citas duplicadas. Nuestra tecnologìa se sincroniza instantaneamente con tus calendarios externos y todos tus dispositivos.</p>
                    </article>
                    <article className="features-desktop__card">
                        <h2>Recordatorios automaticos</h2>
                        <p>Reduce el ausentismo hasta en un 40% con avisos automáticos vía email y mensajes personalizados.</p>
                    </article>
                    <article className="features-desktop__card">
                        <h2>Automatizacion de citas.</h2>
                        <p>Manejo avanzado para gestionar las citas por lotes, vencimientos automaticos, avisos del dia, entre otros.</p>
                    </article>
                    <article className="features-desktop__card">
                        <h2>Tu agenda en tu bolsillo</h2>
                        <p>En tu computadora o en tu celular. Gestiona tus servicios desde cualquier lugar con total libertad.</p>
                    </article>                    
                </section>
            </section>
            <section className="cta-hero">
                <section className="cta-hero__info">
                    <h2>¿Listo para transformar tu día?</h2>
                    <p>Únete a miles de profesionales que ya están optimizando su tiempo y mejorando la satisfacción de sus clientes.</p>
                    <div className="cta-hero__buttons">
                        <button className="btn btn--primario cta__btn">Comienza GRATIS Hoy</button>
                        <button className="btn btn--secundario cta__btn">Hablar con Ventas</button>
                    </div>
                    <p>Sin tarjeta de crédito - 14 días de prueba</p>
                </section>
            </section>
        </>

    )
}