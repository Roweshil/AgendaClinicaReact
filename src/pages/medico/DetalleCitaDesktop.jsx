
import { useNavigate } from "react-router-dom"
import { useMedico } from '../../hooks/useMedico.js'
import { useSearchParams } from "react-router-dom"
import { formatCita } from '../../utils/fechaUtils.js'

export function DetalleCitaDesktop() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const uuidParam = searchParams.get("uuid")

    const { citas } = useMedico()

    const cita = citas.find(c => c.uuid === uuidParam)
    console.log(cita)


    return (
        <section className="actualizar-cita">
            <header  className="actualizar-cita__header">
                <h1>Informacion de la cita</h1>

            </header>


            <article  className="actualizar-cita__card" >

                    <section className="actualizar-cita__card">
                        <section className="actualizar-info">
                            <div>
                                <p>Paciente:</p> 
                                <p className="detalle-info">{cita.paciente}</p>
                            </div>
                            <div>
                                <p>Telefono:</p>
                                <p className="detalle-info">{cita.telefono}</p>
                            </div>
                            <span>
                                <div>
                                    <p>Fecha: </p>
                                    <p className="detalle-info">{formatCita(cita).fecha}</p>
                                </div>
                                <div>
                                    <p>Hora:</p>
                                    <p className="detalle-info">{cita.hora}</p>
                                </div>
                            </span>
                            <div>
                                <p>Motivo:</p>
                                <p className="detalle-info">{cita.motivo}</p>
                            </div>
                            <div>
                                <p> Estatus: </p>
                                <p className="detalle-info">{cita.estado}</p>
                            </div>

                        </section>

                    
                    </section>

                    <footer className="actualizar-cita__footer">  
                        <button type="button" onClick={() => navigate(`/lista`)} className="btn btn--primario">Regresar</button>
                    </footer>
            </article>
        </section>
    )
}