import { Link } from "react-router-dom"

export const NotFound = () => (
  <section className="not-found">
    <h1>404</h1>
    
    <iframe 

        src="https://www.youtube.com/embed/_yqSbnbUsj4?si=8Eq6MEs7MAESAEtG" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
    </iframe>
    <h2>La página que buscas no existe.</h2>
    <Link to="/">Volver al inicio</Link>
  </section>
)