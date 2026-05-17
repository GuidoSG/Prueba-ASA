import { useState } from 'react'

const services = [
  {
    icon: '📊',
    title: 'Análisis de Datos',
    desc: 'Convertimos datos crudos en insights accionables. Identificamos patrones, tendencias y oportunidades que tu negocio todavía no está viendo.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    icon: '⚡',
    title: 'Automatización',
    desc: 'Eliminamos tareas repetitivas de tus procesos. Desde reportes automáticos hasta flujos de trabajo inteligentes que trabajan por ti.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
  },
  {
    icon: '🤖',
    title: 'IA Aplicada',
    desc: 'Modelos de inteligencia artificial adaptados a tu industria y escala. Soluciones prácticas, no tecnología por tecnología.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    icon: '📈',
    title: 'Dashboards',
    desc: 'Visualizaciones claras e interactivas para que puedas tomar decisiones en tiempo real, sin depender de terceros.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
]

export default function Services() {
  const [activo, setActivo] = useState(0)
  const servicio = services[activo]

  return (
    <section id="servicios" className="section services">
      <div className="section-header">
        <p className="section-label">Lo que hacemos</p>
        <h2 className="section-title">Servicios diseñados para escalar rápido</h2>
        <p className="section-subtitle">
          Trabajamos con equipos ágiles que necesitan resultados concretos, no proyectos
          de seis meses que nunca llegan a producción.
        </p>
      </div>

      <div className="services-tabs">
        <div className="services-tab-list">
          {services.map((s, i) => (
            <button
              key={s.title}
              className={`services-tab-btn ${activo === i ? 'activo' : ''}`}
              onClick={() => setActivo(i)}
            >
              <span className="services-tab-icon">{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        <div className="services-tab-content">
          <div className="services-tab-img-wrap">
            <img src={servicio.image} alt={servicio.title} className="services-tab-img" />
          </div>
          <div className="services-tab-info">
            <div className="services-tab-title-row">
              <span className="services-tab-big-icon">{servicio.icon}</span>
              <h3 className="services-tab-title">{servicio.title}</h3>
            </div>
            <p className="services-tab-desc">{servicio.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}