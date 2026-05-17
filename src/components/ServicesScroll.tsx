import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: '📊',
    title: 'Análisis de Datos',
    desc: 'Convertimos datos crudos en insights accionables. Identificamos patrones, tendencias y oportunidades que tu negocio todavía no está viendo.',
    bg: '#1a1f2e',
  },
  {
    icon: '⚡',
    title: 'Automatización',
    desc: 'Eliminamos tareas repetitivas de tus procesos. Desde reportes automáticos hasta flujos de trabajo inteligentes que trabajan por ti.',
    bg: '#141824',
  },
  {
    icon: '🤖',
    title: 'IA Aplicada',
    desc: 'Modelos de inteligencia artificial adaptados a tu industria y escala. Soluciones prácticas, no tecnología por tecnología.',
    bg: '#1e2435',
  },
  {
    icon: '📈',
    title: 'Dashboards',
    desc: 'Visualizaciones claras e interactivas para que puedas tomar decisiones en tiempo real, sin depender de terceros.',
    bg: '#12161f',
  },
]

export default function ServicesScroll() {
  const [activo, setActivo] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const { top, height } = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -top / (height - window.innerHeight)
      const index = Math.min(
        services.length - 1,
        Math.max(0, Math.floor(scrollProgress * services.length))
      )
      setActivo(index)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="servicios" ref={sectionRef}
      style={{ height: `${services.length * 100}vh`, position: 'relative' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: services[activo].bg,
        transition: 'background 0.6s ease',
        padding: '0 5%',
      }}>
        <p style={{
          fontSize: '0.72rem',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#ff6b35',
          marginBottom: '48px',
        }}>
          Lo que hacemos
        </p>

        <div style={{
          fontSize: '5rem',
          marginBottom: '24px',
          transition: 'all 0.4s ease',
        }}>
          {services[activo].icon}
        </div>

        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#ffffff',
          marginBottom: '20px',
          textAlign: 'center',
          transition: 'all 0.4s ease',
        }}>
          {services[activo].title}
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          textAlign: 'center',
          lineHeight: 1.7,
          transition: 'all 0.4s ease',
        }}>
          {services[activo].desc}
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '48px',
        }}>
          {services.map((_, i) => (
            <div key={i} style={{
              width: i === activo ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === activo ? '#ff6b35' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}