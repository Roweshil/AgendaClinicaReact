import { useReducer } from 'react'
import { useMedico } from '../../hooks/useMedico.js'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom" 
import { formatCita } from '../../utils/fechaUtils.js'
import { BotonEliminar } from './BotonEliminar.jsx'

//<p>Fecha de creacion: {formatCita(cita).creacion} </p>

export function ListaCitasDesktop() {
    const navigate = useNavigate()

    const contenedor = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
            staggerChildren: 0.08 // cada tarjeta espera 80ms antes de animar
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 }
    }

    const { citas } = useMedico()

    const filtrosDia = [
        { value: "todas", label: "Todas" },
        { value: "hoy", label: "Hoy" },
        { value: "manana", label: "Mañana" },
        { value: "semana", label: "Próximos 5 días" }
    ]

    const filtrosEstado = [
        { value: "todas", label: "Todas" },
        { value: "confirmada", label: "Confirmadas" },
        { value: "cancelada", label: "Canceladas" },
        { value: "vencida", label: "Vencidas" }
    ]

    const initialState = {
        estado: "todas",
        dia: "todas"
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_ESTADO":
            return { ...state, estado: action.payload }
            case "SET_DIA":
            return { ...state, dia: action.payload }
            case "RESET":
            return initialState
            default:
            return state
        }
    }

    const [filtros, dispatch] = useReducer(reducer, initialState)

    const citasOrdenadas = citas.sort((a, b) => a.fecha.localeCompare(b.fecha))

    const citasFiltradas = citasOrdenadas.filter(cita => {

        const [year, month, day] = cita.fecha.split("-")
        const fechaCita = new Date(year, month - 1, day)
        fechaCita.setHours(0, 0, 0, 0)
        

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0) 

        const manana = new Date(hoy)
        manana.setDate(hoy.getDate() + 1)

        const en5Dias = new Date(hoy)
        en5Dias.setDate(hoy.getDate() + 5) 

        fechaCita.setHours(0, 0, 0, 0)

        if (filtros.dia === "hoy") {
            if (fechaCita.getTime() !== hoy.getTime()) return false
        }

        if (filtros.dia === "manana") {
            if (fechaCita.getTime() !== manana.getTime()) return false
        }

        if (filtros.dia === "semana") {
            if (fechaCita < hoy || fechaCita > en5Dias) return false
        }

        if (filtros.estado !== "todas" && cita.estado !== filtros.estado) return false

        return true
    })

    return (
        <section className="lista-citas">
            <header className="lista-citas__header">
                <article className="lista-citas__title">
                    <h2>Gestión de Citas.</h2>
                    <p>{citas.length} citas registradas.</p>
                </article>
                
                <section className="filtros">
                    <div className="filtros-dia">
                        {filtrosDia.map(filtro => (
                            <button
                            key={filtro.value}
                            className={filtros.dia === filtro.value ? "filtro-dia__btn activo " : "filtro-dia__btn"}
                            onClick={() => dispatch({ type: "SET_DIA", payload: filtro.value })}
                            >
                                {filtro.label}
                            </button>
                        ))}
                    </div>

                    <div className="filtros-estado">
                        {filtrosEstado.map(filtro => (
                            <button
                            key={filtro.value}
                            className={filtros.estado === filtro.value ? "filtro-estado__btn activo" : "filtro-estado__btn"}
                            onClick={() => dispatch({ type: "SET_ESTADO", payload: filtro.value })}
                            >
                                {filtro.label}
                            </button>
                        ))}
                    </div>
                </section>
            </header>
            <motion.div
                key={JSON.stringify(filtros)}
                className="lista__elements"
                variants={contenedor}
                initial="hidden"
                animate="show"
            >
            
                {citasFiltradas.map((cita) => (
                    <motion.article
                        key={cita.uuid}
                        className={`cita-card ${cita.estado}`}
                        variants={item}
                        transition={{ duration: 0.5 }}
                    >
                        <header className="cita-card__header">
                            <span>{cita.estado.toUpperCase()}</span>
                            <p>{formatCita(cita).fecha} </p>
                        </header>

                        <section className="cita-info">
                            <div>
                                <p className="cita-title">{cita.paciente}</p>
                                <p className="cita-subtitle">Hora: {cita.hora}hrs</p>
                            </div>
                            <div>
                                <p className="cita-subtitle">MOTIVO</p>
                                <p className="cita-title">{cita.motivo}</p>
                            </div>
                        </section>

                        <footer className="cita__buttons">
                            <button onClick={() => navigate(`/detalle?uuid=${cita.uuid}`)} className="btn citas__btn cita__detail-btn">Detalles</button>
                            <button onClick={() => navigate(`/actualizar?uuid=${cita.uuid}`)} className="btn citas__btn cita__edit-btn">Editar</button>
                            <BotonEliminar uuid={cita.uuid}/>
                        </footer>
                    </motion.article>
                ))}
            </motion.div> 
        </section>
    )
}