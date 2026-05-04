import { useReducer } from 'react'
import { useMedico } from '../../hooks/useMedico.js'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom" 
import { formatCita } from '../../utils/fechaUtils.js'
import { BotonEliminar } from './BotonEliminar.jsx'

//<p>Fecha de creacion: {formatCita(cita).creacion} </p>

export function ListaCitas() {
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

    const citasFiltradas = citas.filter(cita => {

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
        <section className="section--medico-lista">
            <header className="section--medico-lista-header">
                <article>
                    <h2>Gestión de Citas.</h2>
                    <p>{citas.length} citas registradas.</p>
                </article>
                
                <section>
                    <select className="filtro-select" onChange={e => dispatch({ type: "SET_DIA", payload: e.target.value })}>
                        <option value="todas">Todas</option>
                        <option value="hoy">[ Hoy ]</option>
                        <option value="manana">[ Mañana ]</option>
                        <option value="semana">[ Esta semana ]</option>
                    </select>

                    <div className="filtros-dia">
                        {filtrosDia.map(filtro => (
                            <button
                            key={filtro.value}
                            className={filtros.dia === filtro.value ? "filtro-btn activo" : "filtro-btn"}
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
                            className={filtros.estado === filtro.value ? "filtro-btn activo" : "filtro-btn"}
                            onClick={() => dispatch({ type: "SET_ESTADO", payload: filtro.value })}
                            >
                            {filtro.label}
                            </button>
                        ))}
                    </div>
                    
                    <select className="filtro-select" onChange={e => dispatch({ type: "SET_ESTADO", payload: e.target.value })}>
                        <option value="confirmada">Confirmadas</option>
                        <option value="cancelada">Canceladas</option>
                        <option value="vencida">Vencidas</option>
                    </select>      
                </section>
            </header>
            <motion.div
                key={JSON.stringify(filtros)}
                className="medico-lista-citas"
                variants={contenedor}
                initial="hidden"
                animate="show"
            >
            
                {citasFiltradas.map((cita) => (
                    <motion.article
                        key={cita.uuid}
                        className="cita-card"
                        variants={item}
                        transition={{ duration: 0.5 }}
                    >
                        <header className="cita-card-header">
                            <p>{cita.estado}</p>
                            <p>{formatCita(cita).fecha} </p>
                        </header>

                        <section className="cita-info">
                            <div>
                                <p>{cita.paciente}</p>
                                <p>Hora: {cita.hora}hrs</p>
                            </div>
                            <div>
                                <p>Motivo:</p>
                                <p>{cita.motivo}</p>
                            </div>
                        </section>

                        <footer className="section--medico-lista-buttons">
                            <button onClick={() => navigate(`/detalle?uuid=${cita.uuid}`)}>Detalles</button>
                            <button onClick={() => navigate(`/actualizar?uuid=${cita.uuid}`)}>Editar</button>
                            <BotonEliminar uuid={cita.uuid} />
                        </footer>
                    </motion.article>
                ))}
            </motion.div> 
        </section>
    )
}