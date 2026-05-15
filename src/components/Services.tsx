const services = [
  {
    icon: '📊',
    iconClass: '',
    title: 'Análisis de Datos',
    desc: 'Convertimos datos crudos en insights accionables. Identificamos patrones, tendencias y oportunidades que tu negocio todavía no está viendo.',
  },
  {
    icon: '⚡',
    iconClass: 'fucsia',
    title: 'Automatización',
    desc: 'Eliminamos tareas repetitivas de tus procesos. Desde reportes automáticos hasta flujos de trabajo inteligentes que trabajan por ti.',
  },
  {
    icon: '🤖',
    iconClass: '',
    title: 'IA Aplicada',
    desc: 'Modelos de inteligencia artificial adaptados a tu industria y escala. Soluciones prácticas, no tecnología por tecnología.',
  },
  {
    icon: '📈',
    iconClass: 'fucsia',
    title: 'Dashboards',
    desc: 'Visualizaciones claras e interactivas para que puedas tomar decisiones en tiempo real, sin depender de terceros.',
  },
]

export default function Services() {
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

      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card">
            <div className={`service-icon ${s.iconClass}`}>{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
