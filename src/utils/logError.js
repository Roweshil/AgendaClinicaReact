export const logError = async (error, contexto) => {
    try {
        await fetch('/api/logs/error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mensaje: error.message,
                contexto,
                fecha: new Date().toISOString()
            })
        })
    } catch {
        // No mandamos nada si falla, el usuario ya recibe el error en la pagina
    }
}