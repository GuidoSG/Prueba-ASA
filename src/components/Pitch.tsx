export default function Pitch() {
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
                <strong>Foco en clientes jóvenes</strong> — Entendemos el lenguaje de los
                equipos modernos: ágiles, orientados a resultados y sin tiempo que perder.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Sin burocracia</strong> — Entregamos soluciones funcionales en
                semanas, no en trimestres.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Tecnología de punta</strong> — Usamos las herramientas más modernas
                de análisis, automatización e inteligencia artificial disponibles hoy.
              </span>
            </li>
            <li>
              <span className="pitch-check">✓</span>
              <span>
                <strong>Resultados medibles</strong> — Definimos métricas desde el día uno.
              </span>
            </li>
          </ul>

          <div className="pitch-cta">
            <a href="#contacto" className="btn-primary">Habla con nuestro equipo</a>
          </div>
        </div>

        <div className="pitch-visual">
          <div className="pitch-stat">
            <span className="pitch-stat-icon">🚀</span>
            <div className="pitch-stat-info">
              <strong>Startups &amp; Scaleups</strong>
              <span>Nuestro perfil de cliente principal</span>
            </div>
          </div>
          <div className="pitch-stat">
            <span className="pitch-stat-icon">⏱</span>
            <div className="pitch-stat-info">
              <strong>2–4 semanas</strong>
              <span>Tiempo promedio de primera entrega</span>
            </div>
          </div>
          <div className="pitch-stat">
            <span className="pitch-stat-icon">🌎</span>
            <div className="pitch-stat-info">
              <strong>100% remoto</strong>
              <span>Equipo distribuido en Latinoamérica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
