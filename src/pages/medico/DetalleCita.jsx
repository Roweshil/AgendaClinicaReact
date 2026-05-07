
import { useNavigate } from "react-router-dom"
import { useMedico } from '../../hooks/useMedico.js'
import { useSearchParams } from "react-router-dom"
import { formatCita } from '../../utils/fechaUtils.js'

export function DetalleCita() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const uuidParam = searchParams.get("uuid")

    const { citas } = useMedico()

    const cita = citas.find(c => c.uuid === uuidParam)
    console.log(cita)


    return (
        <section className="section--actualizar-cita">
            <header  className="section--actualizar-cita-header ">
                <h1>Informacion de la cita</h1>

            </header>


            <article  className="section--actualizar-cita-card" >

                    <section className="section-actualizar-cita-card">
                        <section className="section--actualizar-cita-info">
                            <div>
                                <p>Paciente:</p> 
                                <p className="section--detalle-cita-info">{cita.paciente}</p>
                            </div>
                            <div>
                                <p>Telefono:</p>
                                <p className="section--detalle-cita-info">{cita.telefono}</p>
                            </div>
                            <span>
                                <div>
                                    <p>Fecha: </p>
                                    <p className="section--detalle-cita-info">{formatCita(cita).fecha}</p>
                                </div>
                                <div>
                                    <p>Hora:</p>
                                    <p className="section--detalle-cita-info">{cita.hora}</p>
                                </div>
                            </span>
                            <div>
                                <p>Motivo:</p>
                                <p className="section--detalle-cita-info">{cita.motivo}</p>
                            </div>
                            <div>
                                <p> Estatus: </p>
                                <p className="section--detalle-cita-info">{cita.estado}</p>
                            </div>

                        </section>

                    
                    </section>

                    <footer className="section--actualizar-cita-footer">  
                        <button type="button" onClick={() => navigate(`/lista`)} className="button-1">Regresar</button>
                    </footer>
            </article>
        </section>
    )
}