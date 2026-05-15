import santiagoBg from '../assets/santiago.JPG'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${santiagoBg})` }}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">Consultora de Datos e IA</div>
        <h1 className="hero-title">
          Transformamos datos<br />
          en <span>decisiones reales</span>
        </h1>
        <p className="hero-subtitle">
          Challenge Insight ayuda a startups, emprendedores y nuevas generaciones de
          empresas a crecer más rápido usando datos, automatización e inteligencia
          artificial aplicada.
        </p>
        <div className="hero-actions">
          <a href="#servicios" className="btn-primary">
            Conoce nuestros servicios
          </a>
          <a href="#metricas" className="btn-secondary">
            Ver resultados
          </a>
        </div>
      </div>
    </section>
  )
}
