const formatDate = (value) => {
  let date

  if (typeof value === "string" && value.includes("-")) {
    const [year, month, day] = value.split("-")
    date = new Date(Number(year), Number(month) - 1, Number(day))
  } else {
    date = new Date(value)
  }

  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export const formatCita = (cita) => ({
    ...cita,
    fecha: formatDate(cita.fecha),
    creacion: formatDate(cita.creacion)
})