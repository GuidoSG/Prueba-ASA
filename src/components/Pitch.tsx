import { useEffect, useRef } from 'react'

export default function Pitch() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = cardsRef.current?.querySelectorAll('.pitch-card')
          cards?.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible')
            }, i * 150)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (cardsRef.current) observer.observe(cardsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" className="section pitch">
      <div className="pitch-inner">
        <div>
          <p className="section-label">¿Por qué nosotros?</p>
          <h2 className="section-title">Construido para la nueva economía</h2>
          <p className="section-subtitle">
            No somos una consultora tradicional. Trabajamos con startups,
            emprendedores y equipos que entienden que los datos son la ventaja
            competitiva real del siglo XXI.
          </p>
          <ul className="pitch-list">
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Foco en clientes jóvenes</strong> Entendemos el lenguaje de los
                equipos modernos: ágiles, orientados a resultados y sin tiempo que perder.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Sin burocracia</strong> Entregamos soluciones funcionales en
                semanas, no en trimestres.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Tecnología de punta</strong> Usamos las herramientas más modernas
                de análisis, automatización e inteligencia artificial disponibles hoy.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Resultados medibles</strong> Definimos métricas desde el día uno.
              </span>
            </li>
          </ul>
          <div className="pitch-cta">
            <a href="#contacto" className="btn-primary">Habla con nuestro equipo</a>
          </div>
        </div>

        <div className="pitch-cards" ref={cardsRef}>
          <div className="pitch-card">
            <span className="pitch-card-icon">🚀</span>
            <div className="pitch-card-body">
              <span className="pitch-card-tag">Clientes</span>
              <p className="pitch-card-text"><em>Trabajamos con <strong>startups y scaleups</strong> que quieren crecer con datos.</em></p>
            </div>
          </div>
          <div className="pitch-card">
            <span className="pitch-card-icon">
  <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <circle fill="rgba(255,255,255,0.2)" cx="24" cy="24" r="20"/>
    <circle fill="rgba(255,255,255,0.9)" cx="24" cy="24" r="16"/>
    <rect x="23" y="11" width="2" height="13" fill="#0f1c2e"/>
    <rect x="26.1" y="22.7" transform="matrix(-.707 .707 -.707 -.707 65.787 27.25)" width="2.3" height="9.2" fill="#0f1c2e"/>
    <circle cx="24" cy="24" r="2" fill="#0f1c2e"/>
    <circle cx="24" cy="24" r="1" fill="#00e676"/>
  </svg>
</span>
            <div className="pitch-card-body">
              <span className="pitch-card-tag">Velocidad</span>
              <p className="pitch-card-text"><em>Primera entrega en <strong>2 a 4 semanas.</strong> Sin burocracia.</em></p>
            </div>
          </div>
          <div className="pitch-card">
            <span className="pitch-card-icon">🌎</span>
            <div className="pitch-card-body">
              <span className="pitch-card-tag">Equipo</span>
              <p className="pitch-card-text"><em><strong>100% remoto</strong> con talento distribuido en Latinoamérica.</em></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}